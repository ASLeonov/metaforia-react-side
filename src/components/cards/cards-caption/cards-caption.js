import React from 'react'
import './cards-caption.css'

function CardsCaption(props) {

  const {activeCardsTab, changeActiveCards} = props

  const onHandleClick = event => {
    const currentTarget = event.target.attributes.targetcardslink.value
      if (currentTarget !== activeCardsTab)
      changeActiveCards(currentTarget)
  }

  const classNameDefault = "content-cards-caption__title"

  return (
    <div className="content-cards-caption">
      <span
        className={activeCardsTab === 'freeCards' ? `${classNameDefault} content-cards-caption__title___active` : classNameDefault}
        onClick={onHandleClick}
        targetcardslink="freeCards"
      >
        Доступные колоды
      </span>
      <span
        className={activeCardsTab === 'payCards' ? `${classNameDefault} content-cards-caption__title___active` : classNameDefault}
        onClick={onHandleClick}
        targetcardslink="payCards"
      >
        Дополнительные колоды
      </span>
      <span
        className={activeCardsTab === 'clientCards' ? `${classNameDefault} content-cards-caption__title___active` : classNameDefault}
        onClick={onHandleClick}
        targetcardslink="clientCards"
      >
        Закачать свою колоду
      </span>
    </div>
  )

}

export default CardsCaption