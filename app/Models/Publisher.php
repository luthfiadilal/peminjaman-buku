<?php

namespace App\Models;

use App\Models\Book;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

class Publisher extends Model implements AuditableContract
{
    use HasFactory, SoftDeletes, Auditable;

    protected $fillable = ['uuid', 'name'];


    public function books()
    {
        return $this->hasMany(Book::class);
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
        return ['table:publishers'];
    }

    public function generateDescriptionForEvent(string $eventName): string
    {
        return match ($eventName) {
            'created' => 'Menambahkan data publisher',
            'updated' => 'Mengedit data publisher',
            'deleted' => 'Menghapus data publisher',
            default => ucfirst($eventName) . ' data publisher',
        };
    }

    public function transformAudit(array $data): array
    {
        $data['note'] = $this->generateDescriptionForEvent($data['event']);
        return $data;
    }
}
