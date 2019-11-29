var inputs = $('input[type="text"]');
var googleSubmitBtn = $('#google-submit');
var snackbar = $('#snackbar');

var inputDate = $('#date');
var inputAmount = $('#amount');
var inputDesc = $('#desc');

function isLoading(status){
  if(status){
    $('html, body').addClass('wait');
    googleSubmitBtn.attr('disabled', true).html('입력중...');
  } else {
    $('html, body').removeClass('wait');
    googleSubmitBtn.attr('disabled', false).html('입력');
  }
}

function checkInput(){
  var isEmpty = false;
  $.each(inputs, function (index, element) {
    if (element.value === '') {
      alert('빈 칸이 있어요.');
      isEmpty = true;
      return false;
    }
  });
  return isEmpty;
}

$('#google-submit').click(function () {

  //빈값 체크
  if (checkInput()) { return; }

  // 입력중..
  isLoading(true);

  $.ajax({
    type: "GET",
    url: "https://script.google.com/macros/s/AKfycbz_Pf1vAabhEa-TnpdnvtLYUBYjs1_agbIbHVPSmnA3IxPJ6vw/exec",
    data: {
      "일자": inputDate.val(),
      "금액": inputAmount.val(),
      "비고": inputDesc.val()
    },
    success: function (response) {
      isLoading(false);

      snackbar.html('입력이 완료됐습니다.').addClass('show');
      setTimeout(function () {
        snackbar.removeClass('show');
      }, 3000);

      //값 비워주기
      inputDate.val('');
      inputAmount.val('');
      inputDesc.val('');
    },
    error: function (request, status, error) {
      isLoading(false);
      console.log("code:" + request.status + "\n" + "error:" + error);
      console.log(request.responseText);
    }
  });
});
