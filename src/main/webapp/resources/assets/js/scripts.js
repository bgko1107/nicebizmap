(function(window, undefined) {
  'use strict';

  /*
  NOTE:
  ------
  PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
  WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */

})(window);


function isEmpty(value){
  if(typeof value === 'function'){
    return false;
  }
  return (value == null || value.length === 0);
}

function getAjax(dst_id, dst_url, dst_params, successFunc, errorFunc, option) {
  var isEmptyOption = isEmpty(option);
  $('#fade').show();
  $('#loading').show();
  $.ajax({
    beforeSend : function(xhr){

    },
    header: {

    },
    type: isEmptyOption ? 'POST' : isEmpty(option.type) ? 'POST' : option.type,
    url: dst_url,
    dataType: isEmptyOption ? 'json' : isEmpty(option.dataType) ? 'json' : option.dataType,
    data: dst_params,
    async: true,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  }).done(function (data) {
    $('#fade').hide();
    $('#loading').hide();
    if (successFunc != null){
      console.log("[ajax 통신 결과] url:", dst_url);
      console.log("dst_id:", dst_id);
      console.log("data:", data);
      console.log("dst_params:", dst_params);
      successFunc(dst_id, data, dst_params);
    }
  }).fail(function (data, textStatus, jqXHR) {
    $('#fade').hide();
    $('#loading').hide();
    try {
      if (errorFunc != null) {
        errorFunc(data, textStatus, jqXHR);
      } else {
        commonAjaxError(data, textStatus, jqXHR);
      }
    } catch (e) {
      // function call fail skip
      alert(e);
      //showAlert('A', e);
    }
  });
}

function commonAjaxError(data, textStatus, jqXHR) {
  try {
    console.log(data);
    if (textStatus == 'parsererror' && 0 < data.responseText.indexOf('로그인')) {
      alert('세션이 만료되어 로그인 페이지로 이동합니다.');
      location.href = '/index.html';
    }
  } catch (e) {

  }
}