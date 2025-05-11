<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use OwenIt\Auditing\Models\Audit;

class AuditController extends Controller
{
    public function index()
    {
        $audits = Audit::with('user')->latest()->paginate(20);

        return Inertia::render('AuditIndex', [
            'audits' => $audits
        ]);
    }
}
