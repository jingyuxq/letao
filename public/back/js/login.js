'use strict';

/**
 * Created by huangiris on 2019/1/5.
 */
(function () {
  $("#from").bootstrapValidator({
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '密码长度必须在2到6之间'
          },
        }
      },
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },



  });
  $("#from").on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      dataType:"json",
      data:$("#from").serialize(),
      success:function (info) {
        // console.log(info);
        if(info.error === 1000){
          $('#from').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error === 1001){
          alert("密码错误")
        }
        if(info.success){
          $('#from').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  });
  $("#reset").on("click",function () {
    $("#from").data('bootstrapValidator').resetForm();
  })
  // $('#reset').click(function() {
  //   console.log( 1111 );
  //   // 除了重置文本, 还要重置校验状态
  //   $('#from').data("bootstrapValidator").resetForm();
  // });
}());