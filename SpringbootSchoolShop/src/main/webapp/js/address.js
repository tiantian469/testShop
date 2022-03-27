$(document).ready(function (){
    var addresId;
    $("[name='changeAddr']").click(function (){
        $("#update-addr").modal({
            backdrop:'static'
        });

        $("#name").val($(this).parents("#parent").find("#conname").text());
        $("#telephone").val($(this).parents("#parent").find("#contel").text());
        $("#detailaddress").val($(this).parents("#parent").find("#detailaddr").text());
         addresId=$(this).parents("#parent").find("#table").attr("address-id");

    });


    $("#saveAddr").click(function (){
        $("#update-form").validate({
            rules:{//校验规则关键字
                detailaddress:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                    required:true,//是否必须填写
                },
                name:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                    required:true,//是否必须填写
                },
                telephone:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                    required:true,//是否必须填写
                }
            },
            messages:{//校验不通过时的提示信息
                detailaddress:{//与规则里面的名称对应
                    required:"详细地址输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
                },
                name:{//与规则里面的名称对应
                    required:"收货人输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
                },
                telephone:{//与规则里面的名称对应
                    required:"手机号输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
                }
            }
        });
        if ($("#detailaddress").val() == ""){
            alert("详细地址输入不能为空！")
            return false;
        }
        if ($("#name").val() == ""){
           alert("收货人输入不能为空！")
            return false;
        }
        if ($("#telephone").val() == ""){
            alert("手机号输入不能为空！")
            return false;
        }
        var saveAddr={};
        saveAddr.addressid=addresId;
         saveAddr.province=$("#provinceUpdate").val();
         saveAddr.city=$("#cityUpdate").val();
         saveAddr.county=$("#countyUpdate").val();
         saveAddr.detailaddr=$("#detailaddress").val();
         saveAddr.conname=$("#name").val();
         saveAddr.contel=$("#telephone").val();

        $.ajax({
            type: "POST",
            url: "/shop/saveAddr",
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            data:saveAddr,
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

    $("[name='deleteAddr']").click(function (){
        addresId=$(this).parents("#parent").find("#table").attr("address-id");
        var address={};
        address.addressid=addresId;
        $.ajax({
            type: "POST",
            url: "/shop/deleteAddr",
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            data:address,
            dateType:"json",
            success:function (result){
                swal(result.msg);
                $("button").click(function (){
                    location.reload();
                });
            },
            error:function (){
                alert("删除失败");
            }
            });
    });

    $("[name='insertAddr']").click(function () {
        $("#insert-addr").modal({
            backdrop:'static'
        });
    });

    $("#insertAddr").click(function (){
        $("#insert-form").validate({
            rules:{//校验规则关键字
                detailaddressInsert:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                    required:true,//是否必须填写
                },
                nameInsert:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                    required:true,//是否必须填写
                },
                telephoneInsert:{//需要校验的输入框名称（注意：输入框只能通过其name属性获得，无法通过ID等方式获得）
                    required:true,//是否必须填写
                }
            },
            messages:{//校验不通过时的提示信息
                detailaddressInsert:{//与规则里面的名称对应
                    required:"详细地址输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
                },
                nameInsert:{//与规则里面的名称对应
                    required:"收货人输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
                },
                telephoneInsert:{//与规则里面的名称对应
                    required:"手机号输入不能为空！",//校验不通过的提示信息（这里是必填而未填的提示信息）
                }
            }
        });
        if ($("#detailaddressInsert").val() == ""){
            alert("详细地址输入不能为空！")
            return false;
        }
        if ($("#nameInsert").val() == ""){
            alert("收货人输入不能为空！")
            return false;
        }
        if ($("#telephoneInsert").val() == ""){
            alert("手机号输入不能为空！")
            return false;
        }
        var insertAddr={};
        insertAddr.addressid={};
        insertAddr.userid={};
       insertAddr.province=$("#provinceInsert").val();
       insertAddr.city=$("#cityInsert").val();
        insertAddr.county=$("#countyInsert").val();
        insertAddr.detailaddr=$("#detailaddressInsert").val();
        insertAddr.conname=$("#nameInsert").val();
       insertAddr.contel=$("#telephoneInsert").val();
       $.ajax({
           type:"POST",
           url:"/shop/insertAddr",
           contentType:"application/x-www-form-urlencoded; charset=utf-8",
           data:insertAddr,
           dataType:"json",
           success:function (result){
               swal(result.msg);
               $("button").click(function (){
                   location.reload();
               });
           },
           error:function (){
               alert("添加失败");
           }
       });

    });
});