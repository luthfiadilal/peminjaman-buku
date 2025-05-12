<?php

namespace App\Models;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

class Borrowing extends Model implements AuditableContract
{
    use HasFactory, Auditable;

    protected $fillable = [
        'user_id',
        'book_id',
        'address',
        'borrowed_at',
        'due_at',
        'returned_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function generateTags(): array
    {
        return ['table:borrowings'];
    }

    public function generateDescriptionForEvent(string $eventName): string
    {
        return match ($eventName) {
            'created' => 'Menambahkan data borrowing',
            'updated' => 'Mengedit data borrowing',
            'deleted' => 'Menghapus data borrowing',
            default => ucfirst($eventName) . ' data borrowing',
        };
    }

    public function transformAudit(array $data): array
    {
        $data['note'] = $this->generateDescriptionForEvent($data['event']);
        return $data;
    }
}
