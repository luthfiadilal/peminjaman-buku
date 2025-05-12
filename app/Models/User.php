<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRole;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use OwenIt\Auditing\Contracts\UserResolver;
use Illuminate\Support\Facades\Auth;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

class User extends Authenticatable implements UserResolver, AuditableContract
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, Auditable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            // 'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }


    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN;
    }

    public function isUser(): bool
    {
        return $this->role === UserRole::USER;
    }

    public static function resolve()
    {
        return Auth::user();
    }

    public function generateTags(): array
    {
        return ['table:users'];
    }

    public function generateDescriptionForEvent(string $eventName): string
    {
        return match ($eventName) {
            'created' => 'Menambahkan data user',
            'updated' => 'Mengedit data user',
            'deleted' => 'Menghapus data user',
            default => ucfirst($eventName) . ' data user',
        };
    }

    public function transformAudit(array $data): array
    {
        $data['note'] = $this->generateDescriptionForEvent($data['event']);
        return $data;
    }
}
