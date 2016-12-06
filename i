#!/bin/bash

function do_help(){
    echo "dev : 运行所有系统系统"
    echo "release: 打包react,启动web"
    echo "UI: 运行UI"
}

function do_build(){
    mvn  -DskipTests=true clean install
}
function do_mvn_run_ihs(){
    kill -9  `lsof -i:8088 | grep java | awk '{print $2}'`
    mvn  -DskipTests=true -f web/pom.xml jetty:run-exploded &
}



function do_start_ui(){


    kill -9  `lsof -i:3000 | grep node | awk '{print $2}'`
    export BACKEND_PORT=8089
    npm run start &

}
function do_ui_build(){

    npm run build
    cd -
}


for OPT in $@ ; do

    echo "开始执行： $OPT"
    case $OPT in
        build)
            do_build
            ;;

        dev|all)
            do_build
            do_start_ui
            do_mvn_run_ihs

            ;;
        ui)
            do_start_ui
            ;;

        ui-build)
            do_ui_build
            ;;
        ihs)
            do_mvn_run_ihs
            ;;
        release)
            do_ui_build
            do_mvn_run_ihs
            ;;
        help)
            do_help
            ;;
    esac

done
