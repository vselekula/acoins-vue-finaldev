<template>
    <div class="col-6 ml-auto mr-auto profile-wrapper">
            <div class="row d-flex align-items-center profile">
                <div class="col-3 clearfix">
                    <b-img rounded="circle" blank blank-color="#fff" alt="left img" class="float-left avatar"/>
                </div>
                <div class="col-7">
                    <div class="row flex-column mb-4">
                        <div class="user_firstName"><h3>Вячеслав Петров</h3></div>
                        <div class="user_position"><h5>старший дизайнер</h5></div>
                    </div>
                    <div class="row">
                        <div class="col flex-column">
                            <div class="user_phone"><font-awesome-icon icon="phone" size="lg" /> +7 (909) 095 35 02</div>
                            <div class="user_mail"><font-awesome-icon icon="envelope" size="lg" /> vkp@avito.ru</div>
                        </div>
                        <div class="col flex-column">
                            <div class="user_inAvito"><font-awesome-icon icon="users" size="lg" /> c 2017г.</div>
                            <div class="user_HB"><font-awesome-icon icon="birthday-cake" size="lg" /> 11 апреля </div>
                        </div>
                    </div>
                </div>
                <div class="col-2">

                </div>
        </div>
    </div>
</template>
<script>


</script>

<style>
    .profile-wrapper{ 
        height: 180px;
        position: relative;
        border-radius: 10px;
        display: flex;
    }
    .avatar{
        box-shadow: 0 -10px 40px -10px rgba(0,64,128,.2);
        width: 80%;
        height: 80%
    }
    .profile{
        width: 100%
    }
</style>