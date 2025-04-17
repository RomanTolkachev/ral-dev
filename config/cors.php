<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

'allowed_methods' => ['*'],

'allowed_origins' => ['http://localhost:3000'], // или твой фронт (например, http://example.test)

'allowed_origins_patterns' => [],

'allowed_headers' => ['*'],

'exposed_headers' => [],

'max_age' => 0,

'supports_credentials' => true,

];