// DOMの解析が完了してから実行する
document.addEventListener('DOMContentLoaded', () => {
    // canvasの取得とcanvas内描画準備
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    //system 
    
    let gameover = 0;
    const MIN_X = 32;
    const MAX_X = 448;
    const MIN_Y = 32;
    const MAX_Y = 288;
    const BORDER = 380;

    //Player
    let player_x = 230;
    let player_y = 160;
    let width = 420;
    let height = 320;
    let size = 8;
    let colsize = 10
    let stage = 0

    const KEYS = {
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        E: 88,
    };
    const MOVING_DISTANCE = 10;


    //Enemy
    const ENEMY_NUM = 200;
    const GRAVITY = 1;
    
    let enemy_x = []; // x座標を配列で管理
    let enemy_y = []; // y座標を配列で管理
    let enemy_GRAVITY = [];


    function playerinit(){
        console.log("player init")
        drawPlayer(player_x, player_y, size);
    }
    // 敵の初期化
    function enemyinit() {
        for (let i = 0; i < ENEMY_NUM; i++) {
            enemy_x[i] = 40 + i * 20; // すべての敵のx座標を40に設定
            enemy_y[i] = 10 - parseInt(Math.random() * 1000);
            enemy_GRAVITY[i] = Math.random() + 1
        }
    }


    
    function setEnemy(){
        for(i=0; i<=ENEMY_NUM; i++){
            enemy_y[i]+= enemy_GRAVITY[i];
            
            if (enemy_y[i] > BORDER){
                enemy_x[i] = 40 + i * 20; // すべての敵のx座標を40に設定
                enemy_y[i] = 0;
            }
            drawEnemy(enemy_x[i],enemy_y[i],size)
        }
    }
    



    function UpdateCanvas(){
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 黒丸描画関数
    function drawPlayer(player_x, player_y, size) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(player_x, player_y, size, 0, 2 * Math.PI);
        ctx.fill();
    }
    function drawEnemy(player_x, player_y, size) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(player_x, player_y, size, 0, 2 * Math.PI);
        ctx.fill();
    }
    function playerCheckCol(){
        for (let i = 0; i < ENEMY_NUM; i++) {
            if((enemy_x[i] >= player_x - colsize  && enemy_x[i] <= player_x + colsize ) && (enemy_y[i] >= player_y - colsize  && enemy_y[i] <= player_y + colsize)){
                gameover = 1;
                console.log("当たってます",gameover);
            }
        }
    }

    
    enemyinit();
    playerinit();
    Update();

    function Update() {
        function animate() {
            if(gameover == 0){
                
                UpdateCanvas();
                drawPlayer(player_x, player_y, size);
                setEnemy()
                requestAnimationFrame(animate);
                playerCheckCol()
            }
        }
        animate();
    }
    

        // フラグを初期化
    let isWPressed = false;
    let isAPressed = false;
    let isSPressed = false;
    let isDPressed = false;

    // キーが押されたときのイベントリスナー
    document.addEventListener('keydown', function(event) {
        const keyCode = event.keyCode;
        
        if(keyCode === KEYS.W) {
            isWPressed = true;
        } else if (keyCode === KEYS.A) {
            isAPressed = true;
        } else if (keyCode === KEYS.S) {
            isSPressed = true;
        } else if (keyCode === KEYS.D) {
            isDPressed = true;
        } 
    });

    // キーが離されたときのイベントリスナー
    document.addEventListener('keyup', function(event) {
        const keyCode = event.keyCode;
        
        if(keyCode === KEYS.W) {
            isWPressed = false;
        } else if (keyCode === KEYS.A) {
            isAPressed = false;
        } else if (keyCode === KEYS.S) {
            isSPressed = false;
        } else if (keyCode === KEYS.D) {
            isDPressed = false;
        } 
    });

    // キーが押されている間の処理
    function checkKeyPressed() {
        if (isWPressed && player_y > MIN_Y) {
            player_y -= MOVING_DISTANCE;
        } 
        if (isAPressed && player_x > MIN_X) {
            player_x -= MOVING_DISTANCE;
        } 
        if (isSPressed && player_y < MAX_Y) {
            player_y += MOVING_DISTANCE;
        } 
        if (isDPressed && player_x < MAX_X) {
            player_x += MOVING_DISTANCE;
        } 
    }

    // 定期的にキーの状態をチェックする
    setInterval(checkKeyPressed, 100); // 例えば、100ミリ秒ごとにチェック
        


    
})


