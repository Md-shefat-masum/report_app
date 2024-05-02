<template>
    <div class="container plan_body_container">
        <div class="plan_body">
            <div id="printarea" class="containr card">
                <form id="plan_form" @submit.prevent="set($event)" method="POST">
                    <div class="text-center">
                        <h6>বিসমিল্লাহির রাহমানির রাহীম</h6>
                        <br />
                        <h6>বার্ষিক পরিকল্পনা</h6>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="col-6 d-flex">
                            <p>বছর:<input type="month" v-model="date" name="date" /></p>
                        </div>
                        <div class="col-6 noprint" align="right">
                            <button type="button" @click.prevent="window.print()" class="btn btn-primary no-print">Print Preview</button>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <table border="2" style="table-layout: fixed;">
                        <tbody>
                            <tr>
                                <td>
                                    <b>&nbsp; কুরআন অধ্যয়ন </b>
                                    <table border="0" style="table-layout: fixed; margin-left: 3px; margin-bottom: 5px;">
                                        <tbody>
                                            <tr>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;মোট দিন:<input type="text" name="quran_days" class="frm1" value="" style="width: 9.6em;" /></div>
                                                </td>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;গড় আয়াত:<input type="text" name="quran_avg_ayat" class="frm1" value="" style="width: 9.5em;" /></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;সূরার নাম:<input type="text" pattern="^[A-Za-z -,]+$" name="surah_name" class="frm1" value="" style="width: 8.5em;" /></div>
                                                </td>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;দারস প্রস্তুত:<input type="text" name="quran_darz" class="frm1" value="" style="width: 10em;" /></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●মুখস্ত : আয়াত:<input type="text" name="quran_ayat" class="frm1" value="" style="width: 7em;" /></div>
                                                </td>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;অর্থসহ সূরা:<input type="text" name="surah_meaning" class="frm1" value="" style="width: 10em;" /></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <b>&nbsp;হাদিস অধ্যয়ন </b>
                                    <table border="0" style="table-layout: fixed; margin-left: 3px; margin-bottom: 5px;">
                                        <tbody>
                                            <tr>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;মোট দিন:<input type="text" name="hadith_days" class="frm1" value="" style="width: 9em;" /></div>
                                                </td>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;গড় হাদিস:<input type="text" name="hadith_avg" class="frm1" value="" style="width: 9.3em;" /></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;গ্রন্থ/বিষয়:<input type="text" name="hadith_subjects" class="frm1" value="" style="width: 8.2em;" /></div>
                                                </td>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;দারস:<input type="text" name="hadith_darz" class="frm1" value="" style="width: 12em;" /></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;মুখস্থ:<input type="text" name="hadith_memorize" class="frm1" value="" style="width: 10em;" /></div>
                                                </td>
                                                <td class="custom_block" style="padding-right: 5px;">
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;বিষয়:<input type="text" pattern="^[A-Za-z -,]+$" name="hadith_topics" class="frm1" value="" style="width: 11.2em;" /></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="custom_block2" valign="top" style="padding-left: 3px; padding-bottom: 5px;">
                                    <b>সাহিত্য অধ্যয়ন</b><br />
                                    <table class="w-100">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">
                                                        ●&nbsp;মোট পৃষ্ঠা:<input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]" name="literature_pages" class="frm2" value="" style="width: 5.4em;" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">
                                                        ●&nbsp;ইসলামী:<input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]" name="literature_islamic" class="frm2" value="" style="width: 5.4em;" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">
                                                        ●&nbsp;অন্যান্য:<input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]" name="literature_others" class="frm2" value="" style="width: 5.4em;" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;বইয়ের&nbsp;নাম:<input type="text" name="literature_book_name" class="frm2" value="" style="width: 25.6em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;বই&nbsp;নোট:<input type="text" name="literature_book_note" class="frm2" value="" style="width: 25.6em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;বই:<input type="text" name="literature_book" class="frm2" value="" style="width: 10em;" /></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;আলোচনা&nbsp;নোট:<input type="text" name="literature_discussion" class="frm2" value="" style="width: 10em;" /></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td class="custom_block3" valign="top" style="padding-left: 3px; padding-bottom: 0px;">
                                    <b>পাঠ্যপুস্তক অধ্যয়ন</b><br />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;মোট&nbsp;দিন:<input type="text" name="general_book_days" class="frm2" value="" style="width: 10.6em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;গড়&nbsp;ঘন্টা:<input type="number" step="any" name="dawat_total_hours" class="frm2" value="" style="width: 10.6em;" /></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">
                                                        ●&nbsp;মোট&nbsp;ক্লাস:<input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]" name="class_attendance" class="frm2" value="" style="width: 8.6em;" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">
                                                        ●&nbsp;মোট&nbsp;উপস্থিতি:<input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]" name="attendance_total_days" class="frm2" value="" style="width: 8.6em;" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                    <b>নামাজ </b><br />
                                    <div class="d-flex justify-content-between align-items-end py-1">
                                        <span style="width: 95%;">●&nbsp;প্রতি ওয়াক্ত নামাজ জামাতে আদায় করা হবে ইনশাল্লাহ:</span><input type="checkbox" class="checkbox" name="jamayat_namaz" style="float: right; margin-right: 10px;" value="" /><br />
                                    </div>
                                    <div class="d-flex justify-content-between align-items-end py-1">
                                        ●&nbsp;কিছু নফল নামাজ/ইবাদাত আদায় করা হবে ইনশাল্লাহ:<input type="checkbox" class="checkbox" name="nafal_namaz" style="float: right; margin-right: 10px;" value="" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="custom_block2" valign="top" style="padding-left: 3px; padding-bottom: 5px;">
                                    <b>যোগাযোগ</b><br />
                                    <table class="w-100">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;সদস্য:<input type="text" name="contact_member" class="frm2" value="" style="width: 5.5em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;সাথী:<input type="text" name="contact_associate" class="frm2" value="" style="width: 5.5em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;কর্মী:<input type="text" name="contact_worker" class="frm2" value="" style="width: 5.5em;" /></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="w-100">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;সমর্থক:<input type="text" name="contact_supporter" class="frm2" value="" style="width: 5.1em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;বন্ধু:<input type="text" name="contact_friend" class="frm2" value="" style="width: 5.1em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;শুভাকাঙ্খী:<input type="text" name="contact_wellwisher" class="frm2" value="" style="width: 5.1em;" /></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="w-100">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;স্কুল ছাত্র:<input type="text" name="school_student" class="frm2" value="" style="width: 3.4em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;মেধাবী ছাত্র:<input type="text" name="contact_talent" class="frm2" value="" style="width: 3.4em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;শিক্ষক:<input type="text" name="contact_teacher" class="frm2" value="" style="width: 3.4em;" /></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;মুহাররামা:<input type="text" name="contact_teacher" class="frm2" value="" style="width: 3.4em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;ভিআইপি:<input type="text" name="contact_vip" class="frm2" value="" style="width: 10.8em;" /></div>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td class="custom_block2" valign="top" style="padding-left: 3px; padding-bottom: 5px;">
                                    <b>সাংগঠনিক দায়িত্ব পালন</b><br />
                                    <br />
                                    <b>দাওয়াতি কাজ</b><br />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;দিন:<input type="number" name="dawat_days" class="frm2" value="" style="width: 5em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;গড় ঘন্টা:<input type="number" step="any" name="dawat_total_hours" class="frm2" value="" style="width: 5em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;কতজন:<input type="text" name="dawat_person" class="frm2" value="" style="width: 5em;" /></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                    <b>অন্যান্য সাংগঠনিক কাজ </b><br />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;মোট দিন:<input type="text" name="org_work_days" class="frm2" value="" style="width: 10em;" /></div>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between align-items-end">●&nbsp;গড় ঘন্টা:<input type="number" step="any" name="org_work_avg_hours" class="frm2" value="" style="width: 10em;" /></div>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ⚪ <b>বিতরণ</b>
                    <table border="0" style="table-layout: fixed; padding: 0px; margin: 0px;">
                        <tbody>
                            <tr>
                                <td>
                                    <table border="2" style="table-layout: fixed; padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">ইসলামী সাহিত্য</td>
                                                <td style="padding: 5px;"><input type="text" name="distribution_islamic_literature" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">কিশোর পত্রিকা</td>
                                                <td style="padding: 5px;"><input type="text" name="distribution_kishor_paper" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">Y.W</td>
                                                <td style="padding: 5px;"><input type="text" name="distribution_english_paper" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table border="2" style="table-layout: fixed; padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">ছাত্র সংবাদ</td>
                                                <td style="padding: 5px;"><input type="text" name="distribution_chhatrasangbad" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">ইংরেজি পত্রিকা</td>
                                                <td style="padding: 5px;"><input type="text" name="distribution_perspective" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">পরিচিতি</td>
                                                <td style="padding: 5px;"><input type="text" name="distribution_porichiti" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table border="2" style="table-layout: fixed; padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">ক্লাস রুটিন</td>
                                                <td style="padding: 5px;"><input type="text" name="class_routine" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">স্টীকার/কার্ড</td>
                                                <td style="padding: 5px;"><input type="text" name="sticker_card" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">উপহার/মেসেজ/ই-মেইল</td>
                                                <td style="padding: 5px;"><input type="text" name="gift_sms_email" class="input-borderless" value="" style="width: 9.6em;" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ⚪ <b>বৃদ্ধি</b>
                    <table border="0" style="table-layout: fixed; padding: 0px; margin: 0px;">
                        <tbody>
                            <tr>
                                <td>
                                    <table border="2" style="padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">সদস্য</td>
                                                <td style="padding: 5px;"><input type="text" name="increase_member1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="increase_member2" class="input-borderless" value="" style="width: 17.7em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">সদস্যপ্রার্থী</td>
                                                <td style="padding: 5px;"><input type="text" name="member_elect1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="member_elect2" class="input-borderless" value="" style="width: 17.7em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">সাথী</td>
                                                <td style="padding: 5px;"><input type="text" name="increase_sathi1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="increase_sathi2" class="input-borderless" value="" style="width: 17.7em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">সাথীপ্রার্থী</td>
                                                <td style="padding: 5px;"><input type="text" name="sathi_elect1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="sathi_elect2" class="input-borderless" value="" style="width: 17.7em;" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table border="2" style="padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">কর্মী</td>
                                                <td style="padding: 5px;"><input type="text" name="activist1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="activist2" class="input-borderless" value="" style="width: 21.5em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">সমর্থক</td>
                                                <td style="padding: 5px;"><input type="text" name="supporter1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="supporter2" class="input-borderless" value="" style="width: 21.5em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">বন্ধু</td>
                                                <td style="padding: 5px;"><input type="text" name="increase_friend1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="increase_friend2" class="input-borderless" value="" style="width: 21.5em;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">শুভাকাঙ্খী</td>
                                                <td style="padding: 5px;"><input type="text" name="card_wisher1" class="input-borderless" value="" style="width: 3em;" /></td>
                                                <td style="padding: 5px;"><input type="text" name="card_wisher2" class="input-borderless" value="" style="width: 21.5em;" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ⚪ <b>বাইতুলমাল</b>
                    <table border="0" style="table-layout: fixed; padding: 0px; margin: 0px;">
                        <tbody>
                            <tr>
                                <td>
                                    <table border="2" style="table-layout: fixed; padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">পরিশোধের তারিখ</td>
                                                <td style="padding: 5px;"><input type="date" name="bm_given_date" class="frm2" value="" style="width: 99%;" /></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">ছাত্র কল্যাণ</td>
                                                <td style="padding: 5px;"><input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]||[0-9][0-9][0-9][0-9]" name="student_welfare" class="frm2" value="" style="width: 7.8em;" />টাকা</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table border="2" style="table-layout: fixed; padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">ব্যাক্তিগত বৃদ্ধি</td>
                                                <td style="padding: 5px;"><input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]||[0-9][0-9][0-9][0-9]" name="personal_increase" class="frm2" value="" style="width: 7.8em;" />টাকা</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">টেবিল ব্যাংক</td>
                                                <td style="padding: 5px;"><input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]||[0-9][0-9][0-9][0-9]" name="table_bank" class="frm2" value="" style="width: 7.8em;" />টাকা</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table border="2" style="table-layout: fixed; padding: 0px; margin: 0px;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 5px;">মোট বৃদ্ধি</td>
                                                <td style="padding: 5px;"><input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]||[0-9][0-9][0-9][0-9]" name="baitulmal_total" class="frm2" value="" style="width: 7.8em;" />টাকা</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px;">কলসি/হাড়িঁ</td>
                                                <td style="padding: 5px;"><input type="text" pattern="[0-9]||[0-9][0-9]||[0-9][0-9][0-9]||[0-9][0-9][0-9][0-9]" name="kolsi_hari" class="frm2" value="" style="width: 7.8em;" />টাকা</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ⚪<b>বিবিধ</b><br />
                    <table class="custom_block4" border="0" style="table-layout: fixed; padding: 0px; margin: 0px;">
                        <tbody>
                            <tr>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;আত্মসমালোচনা:<span><input type="text" name="self_criticism" class="frm2" value="" style="width: 11.9em;" />দিন</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;শরীর চর্চা:<span><input type="text" name="physical_exercise" class="frm2" value="" style="width: 11.9em;" />দিন</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;পত্রিকা পাঠ:<span><input type="text" name="manifold_newspaper" class="frm2" value="" style="width: 11.9em;" />দিন</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;আত্মীয়স্বজন (পুরুষ) যোগাযোগ:<span><input type="text" name="muharama_contact" class="frm2" value="" style="width: 9.8em;" />জন</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;গ্রুপ দাওয়াতি কাজ:<span><input type="text" name="group_dawat" class="frm2" value="" style="width: 9.8em;" />বার</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;দাওয়াতি মেসেজ প্রেরণ:<span><input type="text" name="dawat_sms" class="frm2" value="" style="width: 9.8em;" />বার</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;দাওয়াতি ইমেইল প্রেরণ:<span><input type="text" name="dawat_email" class="frm2" value="" style="width: 6.5em;" />বার</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;অমুসলিম যোগাযোগ:<span><input type="text" name="nonmuslim_contact" class="frm2" value="" style="width: 6.5em;" />জন</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;বন্ধু সংগঠনের সাথে যোগাযোগ:<span><input type="text" name="contact_organization" class="frm2" value="" style="width: 6.5em;" />জন</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp; দক্ষতা উন্নয়ন কার্যক্রম: কম্পিউটার শিক্ষা:<span><input type="text" name="computer_learning" class="frm2" value="" style="width: 8.6em;" />দিন</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;ভাষা শিক্ষা:<span><input type="text" name="language_learning" class="frm2" value="" style="width: 8.6em;" />দিন</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-between align-items-end">
                                        ●&nbsp;অন্যান্য:<span><input type="text" name="manifold_others" class="frm2" value="" style="width: 8em; margin-right: 25px;" /></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="d-flex align-items-end">
                                        ●&nbsp; নিজ উদ্যগে রিপোর্ট দেখানো হবে:<span><input type="text" name="report_checking" class="frm2 last_item" value="" style="width: 20em;" /></span>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div class="row">
                        <div class="col-12 d-flex">⚪<b>Opinion &amp; Comment:</b></div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-8 d-flex"><textarea name="opinion" rows="4" cols="50" style="resize: none;"></textarea></div>
                                <div class="col-md-4" align="right">
                                    <p><b>Signature &amp; Date: </b></p>
                                    <button id="save_button" type="submit" class="btn btn-primary noprint">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            date: new Date().toISOString().substring(0, 7),
        }
    },
    created: function(){
        this.get();
    },
    watch: {
        date: {
            handler: function(){
                this.get();
            }
        }
    },
    methods:{
        get: function(){
            axios.post('/report/get-yearly-plan',{date: this.date})
                .then(res=>{
                    // console.log(res.data);
                    $('#plan_form table input').val('');
                    $('#plan_form table textarea').val('');
                    $('#plan_form table input[type="checkbox"').prop('checked',false);
                    let data = res.data;
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const element = data[key];
                            $(`input[name="${key}"]`).val(element);
                        }
                    }
                })
        },
        set: function(event){
            let form_data = new FormData(event.target);
            axios.post('/report/set-yearly-plan',form_data)
                .then(res=>{
                    // console.log(res.data);
                    window.s_alert('plan updated','success')
                })
        },
    }
}
</script>

<style>

</style>
