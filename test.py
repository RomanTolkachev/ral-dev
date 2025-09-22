import logging
import os
import time
from random import choice
from contextlib import contextmanager

from dotenv import load_dotenv
from seleniumwire import webdriver
from selenium.common.exceptions import (
    TimeoutException,
    WebDriverException,
    ElementNotVisibleException,
    NoSuchElementException,
    SessionNotCreatedException
)
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import tempfile, shutil, pathlib, subprocess
import chromedriver_autoinstaller

from log import log_function, logger

# Constants
TARGET_URL = 'https://pub.fsa.gov.ru/ral'
API_PATH = '/api/v1/ral/common/showcases/get'
API_PATH_STATUS = '/api/v1/ral/common/account'
SEARCH_BTN = '//button[@class="p-ripple p-element p-button p-component" and contains(text(), "Найти")]'
RETRY_ATTEMPTS = 5

# Load environment
load_dotenv()
proxy_username = os.getenv('PROXY_USERNAME')
proxy_password = os.getenv('PROXY_PASSWORD')
proxy_port = os.getenv('PROXY_PORT')

BASE_PROFILE_DIR = r"C:\chrome_sw_profiles"  
os.makedirs(BASE_PROFILE_DIR, exist_ok=True)


# Read proxies once
def _load_proxies(file_path='proxy_ip.txt'):
    try:
        with open(file_path) as f:
            return [line.strip() for line in f if line.strip() and not line.startswith('#')]
    except FileNotFoundError:
        logger.error(f"Proxy file not found: {file_path}")
        return []


PROXIES = _load_proxies()


@contextmanager
def create_browser(proxy_url: str):
    """
    Context manager that yields a configured SeleniumWire browser instance
    and ensures it quits on exit.
    """
    profile_dir = pathlib.Path(tempfile.mkdtemp(prefix="sw_", dir=BASE_PROFILE_DIR))
    opts = Options()
#   opts.add_argument("--headless=new")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--no-first-run")
    opts.add_argument("--disable-extensions")
    opts.add_argument("log-level=3")
    opts.add_experimental_option('excludeSwitches', ['enable-logging'])
    # ключевое: без портов → нет DevToolsActivePort
    #opts.add_argument("--remote-debugging-pipe")
    opts.add_argument(f"--user-data-dir={profile_dir}")

    # 3) прокси Selenium Wire
    sw_opts = {
        'proxy': {
            'http':  proxy_url,
            'https': proxy_url,
            'no_proxy': 'localhost,127.0.0.1'
        }
    }

    # 4) совместимый chromedriver под текущий Chrome
    driver_path = chromedriver_autoinstaller.install()
    service = Service(executable_path=driver_path, log_output=subprocess.DEVNULL)

    browser = None
    try:
        browser = webdriver.Chrome(service=service, options=opts, seleniumwire_options=sw_opts)
        yield browser
    finally:
        try:
            if browser:
                browser.quit()
        finally:
            shutil.rmtree(profile_dir, ignore_errors=True)


@log_function
def to_click(btn_xpath: str, browser, wait: WebDriverWait):
    """
    Clicks the given button when visible and waits for page update.
    """
    try:
        # Wait until any loading overlay disappears
        wait.until(EC.invisibility_of_element_located((By.XPATH, '//div[@class="waiter"]')))
        btn = wait.until(EC.element_to_be_clickable((By.XPATH, btn_xpath)))
        browser.execute_script("arguments[0].click();", btn)
    except (TimeoutException, NoSuchElementException, ElementNotVisibleException) as e:
        logger.warning(f"Button click failed: {e}")


@log_function
def get_random_proxy_url():
    """
    Constructs a proxy URL with credentials and random IP.
    """
    if not PROXIES:
        raise RuntimeError("No proxies available in proxy_ip.txt")
    ip = choice(PROXIES)
    print(f'http://{proxy_username}:{proxy_password}@{ip}:{proxy_port}')
    return f'http://{proxy_username}:{proxy_password}@{ip}:{proxy_port}'

Даша, [22.09.2025 13:46]


@log_function
def fetch_headers_with_proxy(proxy_url: str):
    """
    Starts a browser with given proxy, navigates to TARGET_URL,
    clicks search, waits for API XHR and returns its headers.
    """
    with create_browser(proxy_url) as browser:
        wait = WebDriverWait(browser, 40)
        browser.get(TARGET_URL)
        while True:
            to_click(SEARCH_BTN, browser, wait)
            req_status = browser.wait_for_request(API_PATH_STATUS, timeout=40)
            code_status = getattr(getattr(req_status, "response", None), "status_code", None)
            if code_status == 503:
                time.sleep(10)
                continue  
            break
        req = browser.wait_for_request(API_PATH, timeout=50)
        code = getattr(getattr(req, "response", None), "status_code", None)
        if code == 304:
            return req.headers
        else:
            raise RuntimeError(f"Unexpected status {code}")


@log_function
def get_headers_proxy():
    """
    Перебирает все прокси из proxy_ip.txt и пробует получить заголовки.
    Если ни один прокси не сработал — кидает исключение.
    """
    if not PROXIES:
        raise RuntimeError("Нет доступных прокси в proxy_ip.txt")

    for idx, ip in enumerate(PROXIES, start=1):
        proxy_url = f"http://{proxy_username}:{proxy_password}@{ip}:{proxy_port}"
        logger.info(f"[{idx}/{len(PROXIES)}] Пробуем прокси: {proxy_url}")

        try:
            headers = fetch_headers_with_proxy(proxy_url)
            logger.info(f"✅ Успешно получили заголовки через {proxy_url}")
            return { 
                'Authorization': headers.get('Authorization'),
                'Cookie': headers.get('Cookie'),
                'Content-Type': headers.get('Content-Type'),
                'https': proxy_url
            }
        except SessionNotCreatedException as e:
            logger.warning(f"[{idx}] Прокси {proxy_url} — ошибка (SessionNotCreated): {e}")
            time.sleep(2)
        except Exception as e:
            logger.warning(f"[{idx}] Прокси {proxy_url} — ошибка: {e}")
            time.sleep(2)

    raise RuntimeError("Все прокси из списка оказались недоступны")


if __name__ == '__main__':
    get_headers_proxy()