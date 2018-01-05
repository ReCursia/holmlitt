//Глобальные переменные
const MATRIX = [
    [[2,1],[1,2]],
    [[1,2],[1,2]],
    [[1,2],[2,1]],
    [[0,3],[1,2]],
    [[0,3],[2,1]],
    [[0,3],[3,0]]
];
var nodes;
var edges;
var matrix;
//-------ФУНКЦИИ-------
//Если страница загрузилась
window.onload = function() {
   startNetwork();
};
//Выводим число вершин
function updateVertex(){
				document.getElementById('amount_of_vertex').innerHTML = '<p>Число вершин: '+nodes.length+'</p>';
			}
//Призма Мебиуса
function PM(n){
                for (var i = 0; i < n; i++) {
		            if (i % 2) continue; //нечетное
		            matrix[i % n][(i + 1) % n] = 1;
		            //неориентированный граф
		            matrix[(i + 1) % n][i % n] = 1;
	            }

	            for (var i = 0; i < n; i++) {
		            matrix[i % n][(i + 2) % n] = 1;
		            //неориентированный граф
		            matrix[(i + 2) % n][i % n] = 1;
	            }
            }
//Лестница Мебиуса
function LM(n){
                for(var i = 0; i < n;i++){
                    matrix[i%n][(i+1)%n] = 1;
                    matrix[i%n][(i+n/2)%n] = 1;
                    //неориентированный граф
                    matrix[(i + 1) % n][i % n] = 1;
		            matrix[(i + n/2) % n][i % n] = 1;
                }
            }
//Обобщенный граф Петерсона
function PG(n){
                 for (var i = 0; i < n; i++) {
		            if (i % 2) continue; //нечетное
		            matrix[i % n][(i + 1) % n] = 1;
		            matrix[(i + 1) % n][i % n] = 1;
		            //неориентированный граф
		            matrix[i %  n][(i + 2) % n] = 1;
		            matrix[(i + 2) % n][i % n] = 1;
	            }

	            for (var i = 0; i < n; i++) {
		            if (!(i % 2)) continue;
		            matrix[i % n][(i + 4) % n] = 1;
		            //неориентированный граф
		            matrix[(i + 4) % n][i % n] = 1;
	            }
            }
//Скрещенная призма
function CP(n){
                for (var i = 0; i < n; i++) {
                    matrix[i % n][(i + 2) % n] = 1;
                    //неориентированный граф
                    matrix[(i + 2) % n][i % n] = 1;
                }
                for (var p = 0; p < n; p++) {
                    var i = 4 * p; //Не уверен
                    matrix[i % n][(i + 3) % n] = 1;
                    //неориентированный граф
                    matrix[(i + 3) % n][i % n] = 1;
                }
                for (var p = 0; p < n; p++) {
                    var i = 4 * p+2; //Не уверен
                    matrix[i % n][(i - 1) % n] = 1;
                    //неориентированный граф
                    matrix[(i - 1) % n][i % n] = 1;
                }
            }
//Хордальный цикл
function H(n){
                for (var i = 0; i < n; i++) {
                    matrix[i % n][(i + 1) % n] = 1;
                    //неориентированный граф
                    matrix[(i + 1) % n][i % n] = 1;
                }
                for (var i = 0; i < n; i++) {
                    if (i % 2) continue; //нечетное
                    matrix[i % n][(i + 5) % n] = 1;
                    //неориентированный граф
                    matrix[(i + 5) % n][i % n] = 1;
                }
            }
//Создание графа vis js
function startNetwork(){
    document.getElementById('color').innerHTML = '<p1> </p1>';
    // create an array with nodes
    nodes = new vis.DataSet()
    // create an array with edges
    edges = new vis.DataSet()
    //Выбор графа
    var sel = document.getElementById("graph"); // Получаем наш список
    var val = sel.options[sel.selectedIndex].value;
    //Число вершин
    var n = document.getElementById("vertex").value
    n = parseInt(n);
	//Проверка на корректный ввод
	if(!(n)||(n < 0)){
		n = 0;
	}
    switch(val){
        case "1":
            n *=2;
            break;
        case "2":
            n *=2;
            break;
        case "3":
            n *=2;
            break;
        case "4":
            n *=4;
            break;
        case "5":
            n *=2;
            break;
    }
    //Создаем вершины
    for(var i = 0; i < n;i++){
        nodes.add({id: i+1, label: String(i+1), shape: 'circle', color: 'lightblue'});
    }
    //Создаем матрицу смежности(попытаться реализовать без матрицы смежности)
    matrix = [];
    for(var i = 0;i < n;i++){
        matrix[i] = [];
        for(var j = 0;j < n;j++){
            matrix[i][j] = 0;
        }
    }
    //Заполняем матрицу смежности
    switch(val){
        case "1":
            PM(n);
            break;
        case "2":
            LM(n);
            break;
        case "3":
            PG(n);
            break;
        case "4":
            CP(n);
            break;
        case "5":
            H(n);
            break;
    }   
    //Создаем ребра по матрице смежности
    for(var i = 0; i < n;i++){
        for(var j = i; j < n;j++){
            if(matrix[i][j]){
             edges.add({from: i+1, to: j+1 });
            }
        }
    }
    //Создаём граф
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
            interaction:{
                navigationButtons: true,
                hover:true
            },
            locale: 'ru',
            manipulation: {
                addNode: function(nodeData,callback) {                   
                    nodeData.label = String(++n);
                    nodeData.shape = 'circle';
                    nodeData.color = 'lightblue';
                    nodeData.id = n;
                    callback(nodeData);
                },
                enabled: true
            }
    };
    var network = new vis.Network(container, data, options);
}
//Раскраска графа
function colorGraph(){
    document.getElementById('color').innerHTML = '<p1> </p1>';
    var chosen_matrix = document.getElementById("matrix").value-1;
    var n = nodes.length; //Число вершин
    var edge_n = edges.length; //Число рёбер
    
    var Edges = edges.get({
        fields: ['from','to']
    }); //Получаем данные
    var Nodes = nodes.get({
        fields: ['id']
    }); //Получаем данные
    
    //Перекрашивание в дефолтный цвет
    for(var i = 0; i < n;i++){
            nodes.update([{id: Nodes[i].id, color:{background: 'lightblue',highlight:{background: 'lightblue', border: 'lightblue'},hover:{background: 'lightblue', border: 'lightblue'}}}]);
    }
    
    var flag; //Флажок
    var w_amount; //Число белых вершин
    var b_amount; //Число черных вершин
    
    var color = [] //Массив цветов
    for(var i = 0;i<n;i++) color[Nodes[i].id] = 0;
    //Начало алгоритма
    do{ 
        //Прибавление единицы
        try{
            color[Nodes[0].id] += 1;
        }
        catch(err){
            document.getElementById('color').innerHTML = '<p1 style = "color: red">Необходимо создать граф</p1>';
        }
        for(var i = 0; i < n-1;i++){
            if(color[Nodes[i].id] == 2) color[Nodes[i].id] = 0, color[Nodes[i+1].id] += 1;
            else break;
        }
        if(color[Nodes[n-1].id] == 2) break;
        flag = false;
        for(var i = 0; i < n;i++){
            w_amount = 0;
            b_amount = 0;
            for(var j = 0; j < edge_n;j++){
                if((Edges[j].from)==Nodes[i].id){
                    if(color[Edges[j].to] == 0) w_amount++;
                    else b_amount++;
                }
                else if((Edges[j].to)==Nodes[i].id){
                    if(color[Edges[j].from] == 0) w_amount++;
                    else b_amount++;
                }
            }
            if((w_amount != MATRIX[chosen_matrix][color[Nodes[i].id]][0])||(b_amount != MATRIX[chosen_matrix][color[Nodes[i].id]][1])){
                flag = true;
                break;
            }
        }
    }while(flag);

    //Сам процесс покраски
    if((!flag)&&(n)){
        document.getElementById('color').innerHTML = '<p1 style="color: green">Раскраска совершенная</p>';
        for(var i = 0; i < n;i++){
            if(color[Nodes[i].id] == 1)
                nodes.update([{id: Nodes[i].id, color:{background: 'orange', highlight:{background: 'orange', border: 'orange'},hover:{background: 'orange', border: 'orange'}}}]);
        }
    }
    else document.getElementById('color').innerHTML = '<p1 style = "color: red">Раскраска невозможна</p1>';
}