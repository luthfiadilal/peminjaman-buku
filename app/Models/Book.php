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
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

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
            if (isset($model->pdf_file)) {

                if ($model->pdf_file instanceof UploadedFile) {

                    $fileSize = $model->pdf_file->getSize() / 1024;


                    if ($fileSize < 100 || $fileSize > 500) {
                        throw new \Exception('File size must be between 100 KB and 500 KB');
                    }


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
}
