#include <iostream>
#include <stdlib.h>
#include <time.h>
#include <list>
#define	MAX_COUNT_CARD	36		//Количество карт

using namespace std;

typedef struct tagCard  //Карта
{
		//	Масти:
		//  1-Пики
		//  2-Черви
		//  3-Бубны
		//  4-Крести
		int	suit;//Масть
		//	2 от 10
		//  11-Валет
		//  12-Дама
		//  13-Король
		//  14-Туз
		int	value;//Значение
}Card;

class TCards
{
private:
	int			m_cardCount;				//Количество карт в колоде
	Card		*card_batch;				//Колода
	void		MixCards();					//Перемешиваем колоду
	tagCard		m_trump;					//Козырь
public:
	TCards();							//Заполняем колоду
	~TCards();							//Уничтожаем колоду
	int			GetCount()	{return m_cardCount;};
	bool		IsEmpty()	{return m_cardCount==0?true:false;};			//Пустая колода ?
	Card		GetCard()	{return card_batch[--m_cardCount];};				//Отдать карту	
	tagCard		GetTrumb()	{return m_trump;};
};
//----------------------------------------------------------------------------

//Уничтожаем колоду
TCards::~TCards()
{
	delete card_batch;
}
//----------------------------------------------------------------------------
//Заполняем колоду
TCards::TCards()
{
	int	number=0;
	card_batch=new Card[MAX_COUNT_CARD];
	
	for(int su=0;su<4;su++)//Масти. Всего 4 масти
	for(int c1=0;c1<MAX_COUNT_CARD/4;c1++)
	{   //Заполняем масти
		card_batch[number].suit=su+1;//Масть
		card_batch[number].value=c1+2;//Значение
		number++;
	}
	m_cardCount=MAX_COUNT_CARD;
	MixCards();
	m_trump=card_batch[0];
}
//----------------------------------------------------------------------------
//Перемешываем колоду
void TCards::MixCards()
{ //миксуем колоду
	Card		tmp1;
	Card		tmp2;
	int	i1,i2;
	for(int c=0;c<(int)rand()%1000;c++)
	{
		i1=rand()%MAX_COUNT_CARD;
		i2=rand()%MAX_COUNT_CARD;
		tmp1=card_batch[i1];
		tmp2=card_batch[i2];
		card_batch[i1]=tmp2;
		card_batch[i2]=tmp1;
	}
}
//----------------------------------------------------------------------------
//----------------ВСЕ ДЛЯ КОЛОДЫ БЫЛО ВЫШЕ-----------------
class TPlayer
{
public:
	//TPlayer(); //Конструктор с указателем на колоду
	//~TPlayer();
	void		TakeCard(tagCard tCard){Cards.push_back(tCard);}; //Дать карту игроку
	int			GetCardCount()	{return Cards.size();};
	tagCard		GetCard(int number);
	bool		FindeValue(tagCard card);     //Поиск для подкидывания			
	void		DeleteCard(int number);
	void		ClearCardArrey(){Cards.clear();};
private:
	std::list<tagCard>	Cards;//Карты у игрока
};
bool	TPlayer::FindeValue(tagCard card) //Поиск карты для для подкидывания
{
	if(Cards.size()==0)return false;
	for(int c=0;c<(int)Cards.size();c++)
	{
		if(GetCard(c).value==card.value)
			return true;
	}
	return false;
}
void	TPlayer::DeleteCard(int number)
{
	std::list<tagCard>::iterator i;
	i=Cards.begin();
	for(int c=0;c<number;++i,c++);
	Cards.erase(i);
}
tagCard	TPlayer::GetCard(int number)
{	
	std::list<tagCard>::iterator i;
	i=Cards.begin();
	for(int c=0;c<number;++i,c++);
	return *i;
}
//----------------------------------------------------------------




int main(){

//ждем игроков

//когда игрок подключился - даем ему номер

// изначально 2 игрока

//когда 2-й игрок найден - старт игры

/* создаем объект ИГРА с параметрами

список игроков (набор объектов)
колода
ставка ???

перед стартом:
 -раздача карт
 -определение масти

Игровые моменты: 
 -атака
 -отбитие
 -победа или нет
 */

return 0;
}
