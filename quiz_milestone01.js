var right_answers = 0;
var quiz1_current_actual_chkbox_ans;
var quiz1_array_count = 0;
var quiz1_res;
var question_count = 1;
var quiz1_current_user_ans = "";
var quiz1_current_actual_ans = "";
var quiz1_current_explanation = ""

var quiz_choice = ""
var q_id = 21;  
var q_meta=21;
var choices;
$.ajax({
    url: "https://shanbin-shanan-quiz-milestone-01.herokuapp.com/quiz1/api/quiz/list",

    method: "get",
    contentType: "json/application",
    dataType: 'json',
    success: function (response) {
        console.log("api response", response)
        // quiz1_res = response;
        choices = response.message
    },
    error: function (err) {
        console.log("errors : ", err)
    }
})

function showQuiz1() {
    // multiple choice
    // console.log("quiz1", quiz1_res)

if(q_meta != -1){
    $("#quiz1_q").empty()

    $.ajax({
        // url: `http://localhost:5000/quiz1/api/quiz/${quiz_choice}/${q_id}`,
        url: "https://shanbin-shanan-quiz-milestone-01.herokuapp.com/quiz1/api/quiz?id="+quiz_choice+"&questionid="+q_id,

        // "&uname="+name
        method: "get",
        contentType: "json/application",
        dataType: 'json',
        success: function (response) {
            console.log("question api response", response)
            q_meta= response.message.meta;
            console.log("meta", q_meta)
            displayQuestions(response.message)
        },
        error: function (err) {
            console.log("errors : ", err)
        }
    })
}



}

function displayQuestions(res) {


    document.getElementById("quiz1_statement").innerHTML = question_count + " ) " + res.question;
    // quiz1_current_explanation = res.explanation;
    // quiz1_current_actual_ans = res.answer

    if (res.type == "multiple choice") {
        // var choices = [];
        var choices = res.choices
        console.log("choices", choices, "  ll ,", choices[0])
        $("#quiz1_q").append(
            '<input type="radio" id=' + res.choices[0] + ' name="mcqRadio"  value="' + res.choices[0] + '" onclick="getValue(this.value)"><label for="male">  ' + res.choices[0] + '</label><br><input type="radio" id=' + res.choices[1] + ' onclick="getValue(this.value)" name="mcqRadio" value="' + res.choices[1] + '"><label for="female">  ' + res.choices[1] + '</label><br><input type="radio" id=' + res.choices[2] + ' onclick="getValue(this.value)" name="mcqRadio" value="' + res.choices[2] + '"><label for="other">  ' + res.choices[2] + '</label><br><input type="radio" id=' + res.choices[3] + ' onclick="getValue(this.value)" name="mcqRadio" value="' + res.choices[3] + '"><label for="other">  ' + res.choices[3] + '</label><br><input type="radio" id=' + res.choices[4] + ' onclick="getValue(this.value)" name="mcqRadio" value="' + res.choices[4] + '"><label for="other">  ' + res.choices[4] + '</label><br/>');
    }
    else if (res.type == "fill in the blank") {
        $("#quiz1_q").append('  ' + res.choices + '<br/> Type answer : ' + '<input type="text" id="fill_blank" onchange="getValue(this.value)" /><br/>')

    }
    else if (res.type == "true/false") {
        $("#quiz1_q").append(
            '<input type="radio" id=' + res.choices[0] + ' name="mcqRadio"  value="' + res.choices[0] + '" onclick="getValue(this.value)"><label for="male">  ' + res.choices[0] + '</label><br><input type="radio" id=' + res.choices[1] + ' onclick="getValue(this.value)" name="mcqRadio" value="' + res.choices[1] + '"><label for="female"> b) ' + res.choices[1] + '</label><br>'
        )
    }
    else if (res.type == "checkboxes") {
        console.log(res.answer)
        quiz1_current_actual_chkbox_ans = res.answer;
        console.log(quiz1_current_actual_chkbox_ans)

        $("#quiz1_q").append(
            '<div id="allCheckboxes"><input type="checkbox" id="chkBox1" value="' + res.choices[0] + '" name="Box1" />  <label >' + res.choices[0] + '<br/><input type="checkbox" id="chkBox2" value="' + res.choices[1] + '" name="Box2" />  <label >' + res.choices[1] + '<br/><input type="checkbox" id="chkBox3" value="' + res.choices[2] + '" name="Box3" />  <label >' + res.choices[2] + '<br/><input type="checkbox" id="chkBox4" value="' + res.choices[3] + '" name="Box4" />  <label >' + res.choices[3] + '<br/></div>'
        )
    }

    else if (res.type == "short answer") {

        $("#quiz1_q").append('  ' + res.choices + '<br/> Type answer : ' + '<input type="text" id="fill_blank" onchange="getValue(this.value)" /><br/>')
    }

    $("#quiz1_q").append('<input id="submit-btn" onclick="quiz1Submit()" type="submit" value="Submit">')


}



function getValue(val) {
    quiz1_current_user_ans = val;
}
function quiz1Submit() {
    var uname = document.getElementById("username").value
    var url="";
    if (quiz1_res[quiz1_array_count].type == "checkboxes") {
        var chkbox_ans_arr = []
        if (document.getElementById("chkBox1").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox1").value)
        }
        if (document.getElementById("chkBox2").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox2").value)
        }
        if (document.getElementById("chkBox3").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox3").value)
        }
        if (document.getElementById("chkBox4").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox4").value)
        }
       url="https://shanbin-shanan-quiz-milestone-01.herokuapp.com/quiz1/api/quiz_ans?id="+quiz_choice+"&questionid="+q_id+"&user_ans="+chkbox_ans_arr
    }else{
       url= "https://shanbin-shanan-quiz-milestone-2.herokuapp.com/quiz1/api/quiz_ans?id="+quiz_choice+"&questionid="+q_id+"&user_ans="+quiz1_current_user_ans
    }

    $.ajax({
        // url: `http://localhost:5000/quiz1/api/quiz/${quiz_choice}/${q_id}`,
        // api/check_answer/:quizid/:questionid/:answer’
        url: url,

        // "&uname="+name
        method: "get",
        contentType: "json/application",
        dataType: 'json',
        success: function (response) {
            console.log("question api response", response)
            if (quiz1_res[quiz1_array_count].type == "checkboxess") {
        var chkbox_ans_arr = []
        if (document.getElementById("chkBox1").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox1").value)
        }
        if (document.getElementById("chkBox2").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox2").value)
        }
        if (document.getElementById("chkBox3").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox3").value)
        }
        if (document.getElementById("chkBox4").checked) {
            chkbox_ans_arr.push(document.getElementById("chkBox4").value)
        }
        // console.log("actualchkbx", quiz1_current_actual_chkbox_ans, chkbox_ans_arr)
        // console.log("here we go",_.isEqual(quiz1_current_actual_chkbox_ans, chkbox_ans_arr));


        if (quiz1_current_actual_chkbox_ans.sort().join(',') === chkbox_ans_arr.sort().join(',')) {
            $("#quiz1_q").append('<br/> <h4>Good Job !</h4>')
            right_answers = right_answers + 1;

            setTimeout(showQuiz1, 1000);
        }
        else {
            $("#quiz1_q").append('<br/> <h4>' + quiz1_current_explanation + '</h4>   <input type="submit" onclick="gotExplanation()" value="Got It!">')
        }


    } else {

        if (response.ans == 'true') {
            // alert(1)
            $("#quiz1_q").append('<br/> <h4>Good Job !</h4>')
            setTimeout(showQuiz1, 1000);
            right_answers = right_answers + 1;
        } else {
            quiz1_current_explanation= response.explanation;
            $("#quiz1_q").append('<br/> <h4>' + quiz1_current_explanation + '</h4>   <input type="submit" onclick="gotExplanation()" value="Got It!">')
        }
    }
    if (question_count == 20) {
        document.getElementById("submit-btn").style.display = "none"
        document.getElementById("quiz1_statement").style.display = "none"

        var percent = (right_answers * 100) / 20
        if (percent > 80) {
            alert('Congratulations ' + uname + '! You pass the quiz')
            //$("#quiz1_q").append('<h1> Congratulations' + uname+ 'You pass the quiz</h1>')
        } else {
            alert('Sorry ' + uname + ', You failed the quiz')
            $("#quiz1_q").append('<h1> Sorry ' + uname + ', you failed the quiz</h1>')


        }

    }
    question_count = question_count + 1;
    quiz1_array_count = quiz1_array_count + 1;
    document.getElementById("show-score").innerHTML = "Your score " + uname + "  : " + right_answers


        },
        error: function (err) {
            console.log("errors : ", err)
        }
    })
    q_id= q_meta;
}
function gotExplanation() {
    showQuiz1()

}

var showQuiz_count = 0;
function openQuiz(evt, quizName) {

    if (quizName == "quiz1") {
        if (showQuiz_count == 0) {
            // showQuiz1();
            quiz_choice = choices[0].quiz2;

            // /:"+quiz_choice

            $.ajax({
                url: `https://shanbin-shanan-quiz-milestone-01.herokuapp.com/quiz1/api/quiz/${quiz_choice}`,
                method: "get",
                contentType: "json/application",
                dataType: 'json',
                success: function (response) {
                    console.log("api response", response)
                    quiz1_res = response.message;
                    showQuiz1();
                },
                error: function (err) {
                    console.log("errors : ", err)
                }
            })

        }
        showQuiz_count = showQuiz_count + 1;
    }
    else if (quizName == "quiz2") {
        window.location.href = "index_milestone2.html"
        // showQuiz2();
    }

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(quizName).style.display = "block";
    evt.currentTarget.className += " active";
} 
