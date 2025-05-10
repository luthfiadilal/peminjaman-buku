<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
{
    logger('Role Middleware triggered, role: ' . $role);

    if (!$request->user() || $request->user()->role->value !== $role) {
        abort(403, 'Unauthorized');
    }

    return $next($request);
}

}
