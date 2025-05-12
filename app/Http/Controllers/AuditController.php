<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Enums\UserRole;
use OwenIt\Auditing\Models\Audit;

class AuditController extends Controller
{
    public function index()
    {
        $audits = Audit::with('user')
        ->whereHasMorph('user', [User::class], function ($q) {
            $q->where('role', UserRole::ADMIN);
        })
        ->latest()
        ->paginate(20);

        return Inertia::render('AuditIndex', [
            'audits' => $audits
        ]);
    }
}
