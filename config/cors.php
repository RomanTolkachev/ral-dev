<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

'allowed_methods' => ['*'],

'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1', 'http://127.0.0.1:5173', 'http://webserver.certico.local'], // или твой фронт (например, http://example.test)

'allowed_origins_patterns' => [],

'allowed_headers' => ['*'],

'exposed_headers' => [],

'max_age' => 0,

'supports_credentials' => true,

];