#include <iostream>
#include <stdlib.h>
#include <time.h>
#include <list>

class Colode{
public:
	int num_card;
	int card_trump[2];
	int colod1[9]; // бубны
	int colod2[9]; // червы
	int colod3[9]; // пики	
	int colod4[9]; // крести	
			 //[порядковый номер карты в колоде (0-35), код масти, код карты]
			 //масть 0-  1- 2- 3- 
			//0-4 - 5-валет 6-дама 7-король 8- туз
	
	//определяем набор карт
	Colode(){
		num_card = 36;
		for(int i=0; i<9; i++){
			 colod1[i] = 1; // бубны
			 colod2[i] = 1; // червы
			 colod3[i] = 1; // пики	
			 colod4[i] = 1; // крести
		}
		//card_trump[2] < - надо определить козырную масть 
	}

	get_card(){
	while(1){
			int mst = 0;
			suit = 4*rand()%1000;
			int suit = 0;
			suit = 9*rand()%1000;
		//мистером рэндомом определяем масть и номер карты
		//проверяем, а не забрали ли ее? Если нет, забираем и удаляем из массива	
			switch (mst){
				case 0: if (colod1[suit]!==0) {colod1[suit]=0;
								break;}		
				case 1: if (colod2[suit]!==0) {colod2[suit]=0;//<        добавить ВЫХОД из цикла!!!
								break;}
				case 2: if (colod3[suit]!==0) {colod3[suit]=0;
								break;}
				case 3: if (colod4[suit]!==0) {colod4[suit]=0;
								break;}
			}
		}	
	}


};


class Player{
public:
	int name_code;
	int play_card;
	int colod1[9]; // бубны
	int colod2[9]; // червы
	int colod3[9]; // пики	
	int colod4[9]; // крести

	Player(int code){
		name_code = code;
		play_card = 0;
		for(int i=0; i<9; i++){
			 colod1[9] = 0; // бубны
			 colod2[9] = 0; // червы
			 colod3[9] = 0; // пики	
			 colod4[9] = 0; // крести
		}
	}
	add_card(int m, int s){
		play_card++;
		switch (m){
				case 0: colod1[s] = 1;
									
				case 1: colod2[s] = 1;
								
				case 2: colod3[s] = 1;
								
				case 3: colod4[s] = 1;
		}

	}  //добавить карту игроку

	remove_card(int m, int s) //удалить карту у игрока               //МОГУТ БЫТЬ ОШИБКИ!
	{
		if(play_card!=0) play_card--;
		switch (m){
				case 0: colod1[s] = 0;
									
				case 1: colod2[s] = 0;
								
				case 2: colod3[s] = 0;
								
				case 3: colod4[s] = 0;
		}

	}

	show_card()  //вывод списока карт этого игрока
	{
		cout << play_card <<endl;
		for(int i=0; i<9; i++){
			 if(colod1[i] = 1) cout << "Bub"<< i +6 << endl; // бубны
			 if(colod2[i] = 1) cout << "Cher"<< i +6 << endl; // червы
			 if(colod3[i] = 1) cout << "Pik"<< i +6 << endl; // пики	
			 if(colod4[i] = 1) cout << "Kr" <<i +6 << endl; // крести
		}
	}
	

};

class Game{


};

int main(){

}
