<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function authorize()
    {
        return true; // 認可ロジックを追加したい場合はここを編集
    }

    public function rules()
    {
        return [
            'maxResults' => 'nullable|integer|min:1|max:50',
            'q' => 'required|string|min:1',
        ];
    }

    public function messages()
    {
        return [
            'maxResults.integer' => 'maxResultsは整数で指定してください。',
            'maxResults.min' => 'maxResultsは1以上で指定してください。',
            'maxResults.max' => 'maxResultsは50以下で指定してください。',
            'q.required' => '検索キーワードを入力してください。',
            'q.min' => '検索キーワードは少なくとも1文字以上必要です。',
        ];
    }
}
