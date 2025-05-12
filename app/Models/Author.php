<?php

namespace App\Models;

use App\Models\Book;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

class Author extends Model implements AuditableContract
{
    use HasFactory, SoftDeletes, Auditable;

    protected $fillable = ['uuid', 'name'];


    public function books()
    {
        return $this->belongsToMany(Book::class);
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = (string) \Str::uuid();
        });
    }

    public function generateTags(): array
    {
        return ['table:authors'];
    }

    public function generateDescriptionForEvent(string $eventName): string
    {
        return match ($eventName) {
            'created' => 'Menambahkan data author',
            'updated' => 'Mengedit data author',
            'deleted' => 'Menghapus data author',
            default => ucfirst($eventName) . ' data author',
        };
    }

    public function transformAudit(array $data): array
    {
        $data['note'] = $this->generateDescriptionForEvent($data['event']);
        return $data;
    }
}
