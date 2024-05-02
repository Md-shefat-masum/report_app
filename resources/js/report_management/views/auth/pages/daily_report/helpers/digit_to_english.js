export default function (input, type='number') {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let result = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const index = banglaDigits.indexOf(char);

        if (index !== -1) {
            result += englishDigits[index];
        } else if (/[a-zA-Z]/.test(char)) {
            result += '';
        } else {
            result += char;
        }
    }

    input = result;
    result = "";
    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (!/[0-9]/.test(char)) {
            if (type=='time' && ( char == '.' || char == ':' || char == ',' )){
                result += char;
            }else{
                result += "";
            }
        } else {
            result += char;
        }
    }

    return result;
}