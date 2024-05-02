<?php

namespace Database\Seeders;

use App\Models\ReportColumn;
use App\Models\ReportColumnVisibility;
use Illuminate\Database\Seeder;

class ReportColumnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $report_columns = [
            [
                'en_name' => 'quran',
                'bn_name' => 'কুরআন অধ্যয়ন',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'surah',
                        'bn_name' => 'সূরা',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'ayat',
                        'bn_name' => 'আয়াত',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'dars',
                        'bn_name' => 'দারস',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'memorise',
                        'bn_name' => 'মুখস্ত : আয়াত',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'surah_with_meaning',
                        'bn_name' => 'অর্থসহ সূরা',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                ],
            ],
            [
                'en_name' => 'hadith',
                'bn_name' => 'হাদিস অধ্যয়ন',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'grontho',
                        'bn_name' => 'গ্রন্থ',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'bisoy',
                        'bn_name' => 'বিষয়',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'dars',
                        'bn_name' => 'দারস',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'quantity',
                        'bn_name' => 'সংখ্যা',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'memorise',
                        'bn_name' => 'মুখস্ত',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],

                ],
            ],
            [
                'en_name' => 'literature',
                'bn_name' => 'সাহিত্য অধ্যয়ন',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'book',
                        'bn_name' => 'বই',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'islamic',
                        'bn_name' => 'ইসলামী',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'others',
                        'bn_name' => 'অন্যান্য',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'book_note',
                        'bn_name' => 'বই নোট',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'alocona_note',
                        'bn_name' => 'আলোচনা নোট',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                ],
            ],
            [
                'en_name' => 'reading_time',
                'bn_name' => 'পাঠ্যপুস্তক অধ্যয়ন',
                'child' => [],
                'input_type' => 'text',
                'value_type' => 'time',
            ],
            [
                'en_name' => 'class',
                'bn_name' => 'ক্লাস',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'class_no',
                        'bn_name' => 'সংখ্যা',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'class_present',
                        'bn_name' => 'উপস্থিতি',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ]
                ],
            ],
            [
                'en_name' => 'salat',
                'bn_name' => 'নামাজ',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'jamat',
                        'bn_name' => 'জামাত',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'kaja',
                        'bn_name' => 'কাজা',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'kaja_howar_karon',
                        'bn_name' => 'কাজা হওয়ার কারণ',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'text',
                    ],
                ],
            ],
            [
                'en_name' => 'contact1',
                'bn_name' => 'যোগাযোগ',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'sodossho',
                        'bn_name' => 'সদস্য',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'sathi',
                        'bn_name' => 'সাথী',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'kormi',
                        'bn_name' => 'কর্মী',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'somorthok',
                        'bn_name' => 'সমর্থক',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ]
                ],
            ],
            [
                'en_name' => 'contact2',
                'bn_name' => 'যোগাযোগ',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'bondhu',
                        'bn_name' => 'বন্ধু',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'medhabi_chatro',
                        'bn_name' => 'মেধাবী ছাত্র',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'suvakankhi',
                        'bn_name' => 'শুভাকাংখী',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'muharramah',
                        'bn_name' => 'মুহাররমা',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ]
                ],
            ],
            [
                'en_name' => 'bitoron',
                'bn_name' => 'বিতরণ',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [
                    [
                        'en_name' => 'sahitto',
                        'bn_name' => 'সাহিত্য',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'megazine',
                        'bn_name' => 'ম্যাগাজিন',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'stikar_card',
                        'bn_name' => 'স্টিকার/কার্ড',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ],
                    [
                        'en_name' => 'upohar',
                        'bn_name' => 'উপহার',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'number',
                    ]
                ],
            ],
            [
                'en_name' => 'sangothonik_dayitto_palon',
                'bn_name' => 'সাংগঠনিক দায়িত্ব পালন',
                'input_type' => 'text',
                'value_type' => 'time',
                'child' => [
                    [
                        'en_name' => 'dawati_kaj',
                        'bn_name' => 'দাওয়াতী কাজ',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'time',
                    ],
                    [
                        'en_name' => 'sangothonik_kaj',
                        'bn_name' => 'অন্যান্য সাংগঠনিক কাজ',
                        'value' => 0,
                        'input_type' => 'text',
                        'value_type' => 'time',
                    ]
                ],
            ],
            [
                'en_name' => 'newspaper',
                'bn_name' => 'পত্র পত্রিকা',
                'input_type' => 'checkbox',
                'value_type' => 'boolean',
                'child' => [],
            ],
            [
                'en_name' => 'exercise',
                'bn_name' => 'শরীর চর্চা',
                'input_type' => 'checkbox',
                'value_type' => 'boolean',
                'child' => [],
            ],
            [
                'en_name' => 'atto_somalocona',
                'bn_name' => 'আত্ন সমালোচনা',
                'input_type' => 'checkbox',
                'value_type' => 'boolean',
                'child' => [],
            ],
        ];

        ReportColumn::truncate();
        $hidden_cols = [
            'dars',
            // 'memorise',
            'surah_with_meaning',
            'grontho',
            'bisoy',
            'dars',
            'book_note',
            'alocona_note',
            'kaja_howar_karon',
        ];

        foreach ($report_columns as $item) {
            $item = (object) $item;
            $report = new ReportColumn();
            $report->default = 1;
            $report->parent = 0;
            $report->en_name = $item->en_name;
            $report->bn_name = $item->bn_name;
            $report->input_type = $item->input_type;
            $report->value_type = $item->value_type;
            $report->slug = str_replace(' ', '-', $item->bn_name);
            $report->save();

            if (count($item->child)) {
                foreach ($item->child as $child) {
                    $child = (object) $child;
                    $report2 = new ReportColumn();
                    $report2->default = 1;
                    $report2->parent = $report->id;
                    $report2->en_name = $child->en_name;
                    $report2->bn_name = $child->bn_name;
                    $report2->input_type = $child->input_type;
                    $report2->value_type = $child->value_type;
                    $report2->slug = str_replace(' ', '-', $child->bn_name);

                    if (in_array($child->en_name, $hidden_cols)) {
                        $report2->visibility = 0;
                    }

                    $report2->save();
                }
            }
        }

        ReportColumnVisibility::truncate();
        ReportColumnVisibility::insert([
            [
                'user_id' => 1,
                'column_id' => 3,
                'visibility' => 1,
            ],
            [
                'user_id' => 1,
                'column_id' => 4,
                'visibility' => 1,
            ],
            [
                'user_id' => 1,
                'column_id' => 5,
                'visibility' => 1,
            ],
        ]);
    }
}
