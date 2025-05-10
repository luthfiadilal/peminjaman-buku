<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    // protected $middlewareGroups = [
    //     'web' => [
    //         \App\Http\Middleware\EncryptCookies::class,
    //         \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    //         \Illuminate\Session\Middleware\StartSession::class,
    //         \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    //         \App\Http\Middleware\VerifyCsrfToken::class,
    //         \Illuminate\Routing\Middleware\SubstituteBindings::class,
    //         \App\Http\Middleware\HandleInertiaRequests::class,
    //     ],

    //     'api' => [
    //         \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    //         \Illuminate\Routing\Middleware\ThrottleRequests::class,
    //         \Illuminate\Routing\Middleware\SubstituteBindings::class,
    //     ],
    // ];

    protected $middlewareAliases = [
        'auth' => \App\Http\Middleware\Authenticate::class,
    'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'role' => \App\Http\Middleware\RoleMiddleware::class,

    ];
}
