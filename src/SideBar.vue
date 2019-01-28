<template>
    <div class="Wrapper">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
              integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
              crossorigin="anonymous">
        <div class="Sidebar" :class="boolie ? 'is-collapsed' : ''" @mouseover="boolie = false" @mouseleave="boolie = true">
            <header class="Sidebar-header">
                <div class="Sidebar-logo">
                    <a href="/home">
                    <img :src="'http://192.168.99.100:8000' + me.relations.avatar_file.data.full_path"
                         blank blank-color="#fff" class="avatar_sidebar"/></a>
                </div>
                <div class="name-title">
                    <h4 class="mb-0 px-0 pb-1">{{me.first_name }} {{ me.last_name }}</h4>
                </div>
            </header>
            <nav role="navigation">
                <ul>
                    <div class="balances">
                        <li class="Sidebar-navItem-main balance d-flex">
                            <div class="balanceAndActionWrapper d-flex align-items-center">
                                <i class="Sidebar-menuIcon-balance fa fa-heart fa-lg"></i>
                                <a href="">{{ me.donation_balance }}</a>
                                <!--<button class="btn-outline-light btn float-right btn-sm nav-btn mr-2">подарить</button>-->
                                <addTransaction button-text="подарить" sb-view="true"></addTransaction>
                            </div>
                        </li>
                        <li class="Sidebar-navItem-main balance d-flex">
                            <div class="balanceAndActionWrapper d-flex align-items-center align-self-center">
                                <i class="Sidebar-menuIcon-balance fa fa-wallet fa-lg"></i>
                                <a href="">{{ me.purchase_balance }}</a>
                                <button @click="shop"  class="sidebar_newTrans_view ">купить</button>
                            </div>
                        </li>
                    </div>

                    <br>
                    <li @click="home" class="Sidebar-navItem">
                        <i class="Sidebar-menuIcon fa fa-home"></i>
                        Домой
                    </li>
                    <li @click="shop" class="Sidebar-navItem">
                        <i class="Sidebar-menuIcon fa fa-shopping-cart"></i>
                        Магазин
                    </li>
                    <li @click="HAF" class="Sidebar-navItem">
                        <i class="Sidebar-menuIcon fa fa-medal"></i>
                        Зал славы
                    </li>
                    <li @click="admin" class="Sidebar-navItem">
                        <i class="Sidebar-menuIcon fa fa-user-astronaut"></i>
                        Админ
                    </li>
                    <li @click="logout"  class="Sidebar-navItem">
                        <i class="Sidebar-menuIcon fa fa-sign-out-alt"></i>
                        Log out
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
    import addTransaction from './components/tabs/wallposts/initiateNewTransaction'
    export default {
        name: 'sideBar',
        data() {
            return {
                boolie: true,
                // me: ''
            }
        },
        components: {
          addTransaction
        },
        // computed: {
        //     me: function () {
        //         return this.$store.getters.CURRUSER
        //     }
        // },
        methods: {
        logout: function () {
            this.$store.dispatch('AUTH_LOGOUT')
                .then(() => {
                    localStorage.removeItem("user-token");
                    localStorage.removeItem("user");
                    this.$router.push('/login')
                })
        },
        admin() {
            this.$router.push({name: 'admin'})
        },
        home() {
            // this.$store.dispatch('SET_CURRUSER', JSON.parse(window.localStorage.getItem('user')));
            this.$router.push({name: 'home'})
        },
        shop() {
            this.$router.push({name: 'shop'})
        },
        HAF() {
            this.$router.push({name: 'haf'})
        }
    },
        // beforeMount: function () {
        //     this.me = JSON.parse(window.localStorage.getItem('user'));
        // },
        computed: {
            me(){
                return this.$store.state.me
            }
        }
    }

</script>
<style lang="stylus">
    SIDEBAR = {
    width: 240px,
    widthCollapsed: 50px,
    collapseTransition: max-width 0.4s ease\, min-width 0.4s ease,
    mediaQuery: 500px
}
    .avatar_sidebar {
        width: 100px;
    }
    .name-title{
        position: relative;
        top: 145px;
        left: 50%;
        -webkit-transform: translateX(-40px);
        transform: translateX(-120px);
        display: inline-block;
        width: 100%;
        opacity: 1;
        transition: all 0.4s ease;
    }
    .balances {
        background: linear-gradient(359.43deg, rgba(0, 170, 255, 0.67) 0.76%, #00AAFF 98.81%);
        margin-top: 70px;
        a {
            color: white
            padding-left: 10px
            font-weight: bold
        }
    }

    .Sidebar-menuIcon-balance {
        color: white
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: #818181;
    }

    .Wrapper {
        display: table;
        width: 100%;
        height: 100%;
    }

    .Sidebar {
        position: fixed;
        display: table-cell;
        min-width: SIDEBAR.width;
        // needs a max-width in order to overflow menu items
        max-width: SIDEBAR.width;
        min-height: 100%;
        background-color: #f1ffff;
        transition: SIDEBAR.collapseTransition;
        user-select: none;
        box-shadow: 0 5px 40px -5px rgba(0, 64, 128, 0.2);

        &.is-collapsed {
            max-width: 100px;
            min-width: 100px;
            transition: SIDEBAR.collapseTransition;
            .Sidebar-header {
                margin-bottom: 0;
                .name-title {
                    opacity: 0;
                }
            }
            .Sidebar-logo {
                transform:  translate(-40px, 0px);
                transition: transform 0.4s ease;
            }
            .Sidebar-navItem-main{
                .sidebar_newTrans_view{
                    opacity: 0;
                }
            }
            .Sidebar-navItem {
                padding-left: 40px;
                transition: padding-left 0.4s ease;
                color: white;
                a {
                    opacity: 0;
                }
                .nav-btn {
                    opacity: 0;
                }
             }
            .Sidebar-toggleText {
                display: none;
            }

            .Sidebar-toggleArrow {
                left: 17.5px;
                transform: rotate(179deg);
            }

            .Sidebar-footer {
                &:hover {
                    .Sidebar-toggleArrow {
                        left: 17.5px;
                        transition: left 0.4s ease,
                                transform 0.4s ease;
                    }
                }
            }
        }

        @media (max-width: SIDEBAR.mediaQuery) {
            min-width: SIDEBAR.widthCollapsed;
        }
    }


    .Sidebar-header {
        position: relative;
        height: 130px;
        margin-bottom: 70px;
        text-align: center;
        transition: margin-bottom 0.4s ease
    }


    .Sidebar-logo {
        position: absolute;
        bottom: 0;
        left: 40%;
        transform: translateX(-30px);
        display: inline-block;
        width: 100px;
        height: 100px;
        transition: transform 0.4s ease,
                height 0.4s ease,
                width 0.4s ease;

        @media (max-width: SIDEBAR.mediaQUery) {
            transform: translate(-24px, -80px);
            width: 50px;
            height: 50px;
        }
    }

    .Sidebar-navItem-main {
        padding: 0 20px 0 20px;
        white-space: nowrap;
        overflow: hidden;
        transition: padding-left 0.4s ease;
        height:50px;
        position: relative

        @media (max-width: SIDEBAR.mediaQUery) {
            padding-left: 17px;
        }

    }
    .Sidebar-navItem {
        padding: 10px 0 10px 40px;
        white-space: nowrap;
        overflow: hidden;
        transition: padding-left 0.4s ease;

        @media (max-width: SIDEBAR.mediaQUery) {
            padding-left: 17px;
        }

        &:hover {
            cursor: pointer;
            background-color: rgba(60, 174, 255, 0.28);
        }
        /*.nav-btn {*/
            /*opacity: 1;*/
            /*transition: opacity 0.4s ease;*/

            @media (max-width: SIDEBAR.mediaQUery) {
                display: none;
            }
        }

        a {
            opacity: 1;
            transition: opacity 0.4s ease;

            @media (max-width: SIDEBAR.mediaQUery) {
                display: none;
            }

    }




    .Sidebar-toggleText {
        position: absolute;
        bottom: 22px;
        left: 85px;
        opacity: 0;
        color: #f1ffff;
        font-size: 12px;
        white-space: nowrap;
    }


    .Sidebar-menuIcon {
        color: #2db3ff;

        &:not(.Sidebar-toggleArrow) {
            margin-right: 1rem;
        }
    }


    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }


    @keyframes sidebarArrow {
        0% {
            left:
        }
    }

</style>