<template>
    <div class="transaction-item pt-4">
            <div class="row transaction-item_info mx-4">
                <div>
                    <img src="../../../assets/avatars/aklochkova.png" width="50" height="50" alt="..." class="rounded-circle">
                </div>
                <div class="amount d-flex flex-grow-1 flex-row ml-3">
                    <div class="d-flex flex-column">
                        <div>
                            <span class="badge badge-pill badge-primary">
                                <font-awesome-icon icon="heart" size="lg" /> +100</span>
                        </div>
                        <div class="mt-1">
                            <b>Мы доверяем своей команде</b>
                        </div>
                    </div>
                    <div class="d-flex ml-auto">17.09</div>
                </div>
                <div class="row m-1 my-3">
                    Александра: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam dolorem ex, sint
                    aperiam quam
                    numquam provident cum ad commodi voluptas illum tenetur, fugit praesentium quaerat! Ut sequi
                    aperiam doloribus at ipsa ullam, accusantium pariatur
                    quasi eius fuga similique animi qui aut asperiores esse sint praesentium expedita, illo consectetur
                    odio quis.
                </div>
            </div>
            <div class="add-answer_wrapper">
                <textarea name="" id="add-answer" cols="1" rows="1" placeholder="Добавить комментарий" class="mx-4 mt-2 p-2"></textarea>
                <button type="button" class="btn btn-primary ml-4 mb-4">Отправить</button>
            </div>
    </div>
</template>
<script>

</script>
<style>
    .button-send {
        border-radius: 50%;
    }

    .transaction-item {
        box-shadow: 0 5px 40px -5px rgba(0, 64, 128, .2);
        border-radius: 10px;
    }

    .amount {
        background-color: white;
    }
    .answer {
        background-color: #f6f7f9;

    }
    .add-answer_wrapper{
        background-color: #f6f7f9;
        border-top: solid 1px rgb(220, 220, 220);
            overflow: hidden;
    }
    #add-answer {
        height: 55px;
        overflow: hidden;
        overflow-wrap: break-word;
        width: 100%;
        border: none;
        background-color: #f6f7f9;
        font-size: 18px;
    }
</style>