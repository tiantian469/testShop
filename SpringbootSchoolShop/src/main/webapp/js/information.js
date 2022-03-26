$(document).ready(function(){
    $("#update-form").validate({
        rules:{//校验规则关键字
            email:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                required:true,//是否必须填写
            },
            telephone:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                required:true,//是否必须填写
            }
        },
        messages:{//校验不通过时的提示信息
            email:{//与规则里面的名称对应
                required:"邮箱输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
            },
            telephone:{//与规则里面的名称对应
                required:"手机号输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
            }
        }
    });
    var oldPswflag=0;
    var newPswflag=0;
    $("#name").val($("#nameVal").text());
    $("#email").val($("#emailVal").text());
    $("#telephone").val($("#telephoneVal").text());
    $("#changeInfo").click(function(){
        $("#update-info").modal({
            backdrop:'static'
        });
    });


    $("#saveInfo").click(function (){
        var saveInfo={};
        saveInfo.name=$("#name").val();
        saveInfo.email=$("#email").val();
        saveInfo.telephone=$("#telephone").val();
        $.ajax({
            type: "POST",
            url: "/shop/saveInfo",
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            data:saveInfo,
            dateType:"json",
            success: function(result){
                if (result.msg=="更新失败")
                {
                    swal(result.msg);
                }
                else {
                    $("#update-info").modal('hide');
                    swal("修改成功", "", "success");
                    $("button").click(function (){
                        location.reload();
                    });
                }
            },
            error:function (){
                alert("更新失败");
            }
        });
    });

    $("#changePsw").click(function (){
        $("#update-Psw").modal({
            backdrop:'static'
        });
    });

    $("#oldPsw").blur(function (){
        if ($("#oldPsw").val() != $("#oldPassword").val())
        {
            $("#oldPswError").show();
        }
        else
        {
            $("#oldPswError").hide();
            oldPswflag=1;
        }
    })

   /* $("#newPsw").focus(function (){
        if ($("#oldPsw").val()==$("#Psw").attr("Psw"))
        {
            $("#oldPswError").hide();
            oldPswflag=1;
        }
    });*/

    $("#newPsw").blur(function (){
        if($("#newPsw").val().length<8)
        {
            $("#newPswError").show();
        }
        else {
            $("#newPswError").hide();
            newPswflag=1;
        }
    });

    $("#savePsw").click(function (){
        if (oldPswflag==1&&newPswflag==1)
        {
            var Psw={};
            Psw.Psw=$("#newPsw").val();
            $.ajax({
                type: "POST",
                url: "/shop/savePsw",
                contentType:"application/x-www-form-urlencoded; charset=utf-8",
                data:Psw,
                dateType:"json",
                success: function(result){
                    if (result.msg=="更新失败")
                    {
                        swal(result.msg);
                    }
                    else {
                        $("#update-info").modal('hide');
                        swal(result.msg);
                        $("button").click(function (){
                            location.reload();
                        });
                    }
                },
                error:function (){
                    alert("更新失败");
                }
            });
        }
    })

});
