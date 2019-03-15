<template>
    <div v-if="me !== null" class="Wrapper">
        <!--<button style="position: absolute; right: 0" @click="bool">ddd</button>-->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
              integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
              crossorigin="anonymous">
        <div class="Sidebar" :class="boolie ? 'is-collapsed' : ''">
            <div class="Sidebar" :class="boolie ? 'is-collapsed' : ''" @mouseover="boolie = false"
                 @mouseleave="boolie = true">
                <header class="Sidebar-header">
                    <div class="header-wrapper d-flex">
                        <div class="Sidebar-logo">
                            <a href="/home">
                                <img :src="'http://192.168.99.100:8000' + me.relations.avatar_file.data.full_path"
                                     blank blank-color="#fff" class="avatar_sidebar"/></a>
                        </div>
                        <div class="name-title">
                            <h4>{{me.first_name }}</h4>
                        </div>
                        <div class="position-title">
                            <p>{{me.relations.position.data.name | toLowerCase }} </p>
                        </div>
                    </div>
                </header>
                <nav role="navigation">
                    <ul>
                        <div class="balances flex-row d-flex justify-content-between">
                            <div class="Sidebar-navItem-main donation_balance d-flex">
                                <div class="balanceAndActionWrapper d-flex align-items-center flex-column justify-content-center">
                                    <div class="d-flex sidebar_icons justify-content-center align-items-center">
                                        <i class="Sidebar-menuIcon-balance fa fa-heart fa-lg pr-2"></i>
                                    </div>
                                    <div class="d-flex">{{ me.donation_balance }}
                                    </div>
                                    <!--<button class="btn-outline-light btn float-right btn-sm nav-btn mr-2">подарить</button>-->
                                    <!--<addTransaction button-text="спасибо" sb-view="true"></addTransaction>-->
                                </div>
                            </div>

                            <div class="Sidebar-navItem-main purchase_balance d-flex">
                                <div class="balanceAndActionWrapper d-flex align-items-center align-self-center flex-column justify-content-center">
                                    <div class="d-flex sidebar_icons justify-content-center align-items-center"><i
                                            class="Sidebar-menuIcon-balance fa fa-wallet fa-lg pr-2"></i></div>
                                    <div class="d-flex">{{ me.purchase_balance }}</div>
                                    <!--<button @click="shop" class="sidebar_newTrans_view">магазин</button>-->
                                </div>
                            </div>

                        </div>

                        <div class="Sidebar-navItem-main balance d-flex">
                            <vSelect></vSelect>
                        </div>

                        <li @click="all" class="Sidebar-navItem first">
                            <i class="Sidebar-menuIcon fa fa-home"></i>
                            Лента ASD
                        </li>
                        <li @click="shop" class="Sidebar-navItem">
                            <i class="Sidebar-menuIcon fa fa-shopping-cart"></i>
                            Магазин
                        </li>
                        <li @click="my_purchases" class="Sidebar-navItem">
                            <i class="Sidebar-menuIcon fas fa-shopping-basket"></i>
                            Мои покупки
                        </li>
                        <li @click="HAF" class="Sidebar-navItem">
                            <i class="Sidebar-menuIcon fa fa-medal"></i>
                            Зал славы
                        </li>
                        <li @click="admin" class="Sidebar-navItem">
                            <i class="Sidebar-menuIcon fa fa-user-astronaut"></i>
                            Админ
                        </li>
                        <li @click="logout" class="Sidebar-navItem">
                            <i class="Sidebar-menuIcon fa fa-sign-out-alt"></i>
                            Log out
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="Sidebar_footer  flex-row d-flex justify-content-between px-3">
                <div class="d-flex Footer-title">Итого:</div>
                <div class="Sidebar-navItem-main donation_balance d-flex flex-column align-items-center">
                    <div class="d-flex sidebar_icons justify-content-center align-items-center">
                        <i class="Sidebar-header-balance fa fa-heart fa-md pr-2 align-self-center"></i>
                    </div>
                    <div class="d-flex footer-num">{{ me.total_donated }}
                    </div>
                </div>
                <div class="Sidebar-navItem-main purchase_balance d-flex flex-column align-items-center">
                    <div class="d-flex sidebar_icons justify-content-center align-items-center"><i
                            class="Sidebar-header-balance fa fa-wallet fa-md pr-2"></i></div>
                    <div class="d-flex footer-num">{{ me.total_received }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  // import addTransaction from './components/tabs/wallposts/initiateNewTransaction'
  import vSelect from './components/Sidebar/UserSearchInput'

  export default {
    name: 'sideBar',
    data() {
      return {
        boolie: true,
        loggedOut: false,
        showTotal: false
      }
    },
    components: {
      vSelect
    },
    methods: {
      totalTrigger: function () {
        this.showTotal = !this.showTotal;
      },
      logout: function () {
        this.loggedOut = true;
        this.$store.dispatch('AUTH_LOGOUT')
          .then(() => {
            localStorage.removeItem("user-token");
            localStorage.removeItem("user");
            this.$router.push('/login')
          })
      },
      all() {
        this.$router.push({name: 'all'})
      },
      admin() {
        this.$router.push({name: 'admin'})
      },
      home() {
        this.$router.push({name: 'home'})
      },
      shop() {
        this.$router.push({name: 'shop'})
      },
      HAF() {
        this.$router.push({name: 'haf'})
      },
      my_purchases() {
        this.$router.push({name: 'my_purchases'})
      }
    },
    updated() {
      this.loggedOut = false;
    },
    created() {
      if (this.$store.state.me === null) {
        window.console.log('в store отсутствует me, запрашиваю GET_ME');
        this.$store.dispatch('GET_ME');
      }
    },
    filters: {
      toLowerCase: function (value) {
        if (!value) return '';
        return value.toLowerCase();
      }
    },
    // watch: {
    //   me(value) {
    //     if (value === null) {
    //       window.console.log('в store отсутствует me, запрашиваю GET_ME');
    //       this.$store.dispatch('GET_ME')
    //     }
    //     if (value !== null) {
    //       window.console.log('ME есть');
    //     }
    //   },
    // },
    computed: {
      me() {
        return this.$store.getters.ME
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
    .sidebar_icons {
        width: 25px
        height: 25px
    }

    .Sidebar_footer {
        position: absolute;
        bottom: 0;
        background: #eee;
        width: 100%
        z-index: 1000000;
    }

    .balance {
        margin-top: 60px
    }

    .first {
        margin-top: 20px;
    }

    .avatar_sidebar {
        width: 100%;
        background: #2db3ff;
    }

    .Footer-title {
        position: absolute
        bottom: 55px
        opacity: 1
        color: #b7b6b6
        -webkit-transition: all 0.4s ease
        -moz-transition: all 0.4s ease
        -ms-transition: all 0.4s ease
        -o-transition: all 0.4s ease
        transition: all 0.4s ease
    }

    .v-select .vs__selected-options {
        border-bottom: none;
    }

    .v-select {
        border-radius: 25px
        -webkit-box-shadow: 0 5px 15px -4px rgba(0, 64, 128, 0.2)
        -moz-box-shadow: 0 5px 15px -4px rgba(0, 64, 128, 0.2)
        box-shadow: 0 5px 15px -4px rgba(0, 64, 128, 0.2)
    }

    .balanceSearch {
        margin-top: 60px;
    }

    .name-title {
        background: #2db3ff;
        color: white;
        position: absolute;
        top: 145px;
        left: 50%;
        -webkit-transform: translateX(-40px);
        transform: translateX(-120px);
        display: inline-block;
        width: 100%;
        opacity: 1;
        transition: all 0.4s ease;
    }

    .Sidebar-header-balance {
        COLOR: #b7b6b6;
    }

    .position-title {
        background: transparent;
        color: white;
        position: absolute;
        top: 170px;
        left: 50%;
        -webkit-transform: translateX(-40px);
        transform: translateX(-120px);
        display: inline-block;
        width: 100%;
        opacity: 1;
        transition: all 0.4s ease;
    }

    .balances {
        background: transparent;
        padding: 15px 0 0 0;
        position: relative;
        top: -10px;
        margin-bottom: 10px;
        transition: all 0.4 ease
        /*padding-bottom: 20px;*/

        .total {
            opacity: 100;
            position: relative;
            transform translateX(110px)
            transition: all 0.4s ease
            color: #7ecefc
            top: 30px

            &:hover {
                color: white
                cursor: pointer
            }
        }

        .donation_balance {
            position: absolute
            left: 45px
            transition: all 0.4s ease
        }

        .purchase_balance {
            position: absolute
            right: 45px
            transition: all 0.4s ease
        }

        a {
            color: white
            padding-left: 10px
            font-weight: bold
        }
    }

    .balanceAndActionWrapper {
        color: white
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

    .header-wrapper {
        background: #2db3ff;
        height: 300px;
    }

    .Sidebar {
        position: fixed;
        display: table-cell;
        min-width: SIDEBAR.width;
        z-index 10000;
        // needs a max-width in order to overflow menu items
        max-width: SIDEBAR.width;
        min-height: 100%;
        background-color: #f1ffff;
        transition: SIDEBAR.collapseTransition;
        user-select: none;
        box-shadow: 0 0px 25px -5px rgba(0, 64, 128, 0.2);

        &.is-collapsed {
            max-width: 100px;
            min-width: 100px;
            transition: SIDEBAR.collapseTransition;


            nav {
                .balances {
                    .total {
                        opacity: 0;
                    }

                    .donation_balance {
                        left: 13px
                    }

                    .purchase_balance {
                        right: 13px
                    }
                }
            }

            .Sidebar-header {
                /*margin-bottom: 0;*/

                .name-title {
                    opacity: 0;
                }

                .position-title {
                    opacity: 0;
                }
            }

            .Sidebar_footer {
                .Footer-title {
                    opacity: 0
                }

            }

            .Sidebar-logo {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                overflow: hidden;
                transform: translate(-35px, 0px);
                transition: all 0.4s ease;
            }

            .Sidebar-navItem-main {
                .sidebar_newTrans_view {
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

        }

        @media (max-width: SIDEBAR.mediaQuery) {
            min-width: SIDEBAR.widthCollapsed;
        }
    }

    .footer-num {
        color: #b7b6b6;
        font-size: 14px
    }

    .Sidebar-footer {
        color: black

        .balanceAndActionWrapper {
            color: #b7b6b6
        }
    }

    .Sidebar-header {
        position: relative;
        height: 130px;
        margin-bottom: 70px;
        text-align: center;
        transition: margin-bottom 0.4s ease;
        background: #2db3ff;
    }


    .Sidebar-logo {
        background: #2db3ff;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50px);
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        transition: transform 0.4s ease,
                height 0.4s ease,
                width 0.4s ease;

        @media (max-width: SIDEBAR.mediaQUery) {
            transform: translate(-24px, -80px);
            width: 100px;
            height: 100px;
        }
    }

    .Sidebar-navItem-main {
        white-space: nowrap;
        transition: padding-left 0.4s ease;
        height: 50px;
        position: relative;

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