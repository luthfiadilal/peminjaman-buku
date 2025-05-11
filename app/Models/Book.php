<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Author;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

class Book extends Model implements AuditableContract
{
    use HasFactory, SoftDeletes, Auditable;

    protected $fillable = [
        'uuid', 'title', 'publisher_id', 'category_id', 'author_id', 'publication_year',
        'isbn', 'stock', 'is_available', 'extra_data', 'pdf_file'
    ];

    protected $casts = [
        'extra_data' => 'array',
        'is_available' => 'boolean',
    ];


    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }


    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function authors()
    {
        return $this->belongsToMany(Author::class);
    }

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d M Y');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });

        static::saving(function ($model) {
            if ($model->pdf_file instanceof UploadedFile) {

                // Mengecek apakah file sudah ada dan berbeda
                if ($model->isDirty('pdf_file')) {
                    // Menghapus file lama sebelum menyimpan file baru
                    if ($model->getOriginal('pdf_file')) {
                        Storage::delete($model->getOriginal('pdf_file'));
                    }

                    // Menyimpan file PDF baru
                    $fileSize = $model->pdf_file->getSize() / 1024; // dalam KB
                    if ($fileSize < 100 || $fileSize > 500) {
                        throw new \Exception('File size must be between 100 KB and 500 KB');
                    }

                    // Menyimpan file baru
                    $model->pdf_file = $model->pdf_file->store('pdfs', 'public');
                }
            }
        });
    }



    public function getPdfUrlAttribute()
    {
        return $this->pdf_file ? Storage::url($this->pdf_file) : null;
    }


    public static function booted()
    {
        static::deleted(function ($book) {
            if ($book->pdf_file) {
                Storage::delete($book->pdf_file);
            }
        });
    }

    public function generateTags(): array
    {
        return ['table:books'];
    }

    public function generateDescriptionForEvent(string $eventName): string
    {
        return match ($eventName) {
            'created' => 'Menambahkan data buku',
            'updated' => 'Mengedit data buku',
            'deleted' => 'Menghapus data buku',
            default => ucfirst($eventName) . ' data buku',
        };
    }

}
