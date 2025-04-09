<?php

namespace Database\Seeders;

use App\Models\ReportColumn;
use App\Models\ReportColumnVisibility;
use Illuminate\Database\Seeder;

class ReportJamatColumnSeeder extends Seeder
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
                'bn_name' => 'কুরআন অধ্যয়ন (✓)',
                'input_type' => 'checkbox',
                'value_type' => 'boolean',
                'child' => [],
            ],
            [
                'en_name' => 'hadith',
                'bn_name' => 'হাদিস অধ্যয়ন ( সংখ্যা )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'literature',
                'bn_name' => 'ইসলামী সাহিত্য অধ্যয়ন ( পৃষ্ঠা )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'jamat_salat',
                'bn_name' => 'জামায়াতে নামাজ ( ওয়াক্ত সংখ্যা )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'targeted_dawah_contact',
                'bn_name' => 'দাওয়াতি টার্গেট সাক্ষাত ( কতবার )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'targeted_worker_contact',
                'bn_name' => 'কর্মী টার্গেট সাক্ষাত ( কতবার )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'member_contact',
                'bn_name' => 'সদস্য (রুকন) টার্গেট সাক্ষাত ( কতবার )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'worker_contact',
                'bn_name' => 'কর্মী যোগাযোগ ( কতবার )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'book_distribution',
                'bn_name' => 'বই বিলি ( কতটি )',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'family_meeting',
                'bn_name' => 'পারিবারিক বৈঠক (✓)',
                'input_type' => 'checkbox',
                'value_type' => 'boolean',
                'child' => [],
            ],
            [
                'en_name' => 'social_work',
                'bn_name' => 'সামাজিক কাজ (✓)',
                'input_type' => 'checkbox',
                'value_type' => 'boolean',
                'child' => [],
            ],
            [
                'en_name' => 'org_work',
                'bn_name' => 'সময় দান (ঘন্টা)',
                'input_type' => 'text',
                'value_type' => 'time',
                'child' => [],
            ],
            [
                'en_name' => 'sofor_amount',
                'bn_name' => 'সফর সংখ্যা',
                'input_type' => 'text',
                'value_type' => 'number',
                'child' => [],
            ],
            [
                'en_name' => 'is_keeped_report',
                'bn_name' => 'রিপোর্ট রাখা (✓)',
                'input_type' => 'checkbox',
                'value_type' => 'boolean',
                'child' => [],
            ],
            [
                'en_name' => 'self_analysis',
                'bn_name' => 'আত্মসমালোচনা (✓)',
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

            if (isset($item->child) && count($item->child)) {
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
            // [
            //     'user_id' => 1,
            //     'column_id' => 3,
            //     'visibility' => 1,
            // ],
            // [
            //     'user_id' => 1,
            //     'column_id' => 4,
            //     'visibility' => 1,
            // ],
            // [
            //     'user_id' => 1,
            //     'column_id' => 5,
            //     'visibility' => 1,
            // ],
        ]);
    }
}
