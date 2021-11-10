var cal_num_result = $('#cal_num_result');
var cal_num_process = $('#cal_num_process');
var onInput = false;

var CALCULATOR_INPUT_ENUM = {
    NUMBER : 1,
    OPERATOR : 2,
    COMMAND : 3, 
}

$(document).keydown(function (event) {
    var keyCode = event.keyCode;

    if (keyCode >= 48 && keyCode <= 57) {
        number_input(keyCode - 48);

    } else if (keyCode >= 96 && keyCode <= 105) {
        number_input(keyCode - 96);
    } else {
        switch (keyCode) {
            case 8:
                backspace_input()
                break;
            case 27:
                btn_click("clear");
                break;
            case 107:
                symbol_input("+");
                break;
            case 109:
                symbol_input("-");
                break;
            case 106:
                symbol_input("*");
                break;
            case 111:
                symbol_input("/");
                break;
            case 110:
                decimal_point();
                break;
            case 13:
                symbol_input("=");
                break;
            default:
                break;
        }
    }


});

function getInput(params) {
    
    switch (key) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":

            break;
    
        case "clear":

            break;
    }
}




function btn_click(par) {

    if (Number.isInteger(par)) {
        number_input(par);
    } else if (par == "backspace") {
        backspace_input();
    } else if (par == "clear") {
        cal_num_result.val(0);
        cal_num_process.val("");
    } else {
        symbol_input(par);
    }
}

function number_input(num) {

    if (onInput) {
        if (cal_num_process.val().indexOf('=') != -1) {
            cal_num_process.val("");
        }
        cal_num_result.val(0);
        onInput = false;
    }

    exNum = cal_num_result.val();

    if (exNum == 0) {
        cal_num_result.val(num);
    } else if (exNum.length >= 16) {
        return;
    } else {
        cal_num_result.val(exNum + num);
    }
}

function symbol_input(sym) {

    if (cal_num_result.val() != 0) {
        switch (sym) {

            case '.':
                decimal_point();
                break;
            case '±':
                alert(sym);
                break;
            case '=':
                calculation(sym);
                break;
            default:
                calculation(sym);
                break;
        }
    }
}

function calculation(symbol) {
    if (cal_num_process.val() == "") {
        cal_num_process.val(cal_num_result.val() + ' ' + symbol + ' ');
    }else if(symbol == '='){
        var proArr = cal_num_process.val().split(' ');
        var result = 0;
        if ( proArr.length == 5) {
            switch (proArr[1]) {
                case '+':
                    result = Number(cal_num_result.val()) + Number(proArr[2]);
                    break;
                case '-':
                    result = Number(cal_num_result.val()) - Number(proArr[2]);
                    break;
                case '*':
                    result = Number(cal_num_result.val()) * Number(proArr[2]);
                    break;
                case '/':
                    result = Number(cal_num_result.val()) / Number(proArr[2]);
                    break;
                default:
                    return;
            }
            cal_num_process.val(cal_num_result.val() + ' ' + proArr[1] + ' ' + proArr[2] + " = ");
            cal_num_result.val(result);
            onInput = true;
        }else if (proArr.length == 3) {
            if (proArr[1] == '=') {
                cal_num_process.val(cal_num_result.val() + ' = ');
                return;
            }
            switch (proArr[1]) {
                case '+':
                    result = Number(proArr[0]) + Number(cal_num_result.val());
                    break;
                case '-':
                    result = Number(proArr[0]) - Number(cal_num_result.val());
                    break;
                case '*':
                    result = Number(proArr[0]) * Number(cal_num_result.val());
                    break;
                case '/':
                    result = Number(proArr[0]) / Number(cal_num_result.val());
                    break;
                default:
                    return;
            }
            cal_num_process.val(cal_num_result.val() + ' ' + proArr[1] + ' ' + proArr[0] + " = ");
            cal_num_result.val(result);
        }
    }
    else if (onInput) {
        return;
    } else {
        var proArr = cal_num_process.val().split(' ');
        var result = 0;
        switch (symbol) {
            case '+':
                result = Number(proArr[0]) + Number(cal_num_result.val());
                cal_num_process.val(result + ' + ');
                break;
            case '-':   
                result = Number(proArr[0]) - Number(cal_num_result.val());
                cal_num_process.val(result + ' - ');
                break;
            case '*':
                result = Number(proArr[0]) * Number(cal_num_result.val());
                cal_num_process.val(result + ' * ');
                break;
            case '/':
                result = Number(proArr[0]) / Number(cal_num_result.val());
                cal_num_process.val(result + ' / ');
                break;
            default:
                cal_num_result.val();
                break;
        }
    }
    onInput = true;
}

function decimal_point() {
    
    if (onInput) {
        cal_num_result.val( '0.');
        onInput = false;
    }else if ( cal_num_result.val().indexOf('.') == -1 ) {
        cal_num_result.val( cal_num_result.val() + '.');
    }
}

function backspace_input() {

    exNum = cal_num_result.val();

    if (exNum.length <= 16 && exNum.length > 1) {
        cal_num_result.val(exNum.slice(0, -1));
    } else {
        cal_num_result.val(0);
    }
}

// 숫자 입력하면  result에 숫자가 입력 되어야 한다
// 숫자 버튼을 눌렀을 떄도 입력 되어야 한다.
// 이전에 계산식을 저장하고 있다가 보여 주어야 함.
// 연산자를 입력 했을떄 결과를 보여 주어야 함.
// = 현자 계산 완료/ 마지막 계산 반복