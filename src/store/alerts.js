import React from 'react'

export const alerts = {

  "alert_contactsStartSessionError":
    <div>
      <p>Произошла ошибка.</p>
      <p>Пожалуйста, повторите попытку создать сессию сейчас или&nbsp;немного&nbsp;позднее.</p>
      <p>Если ошибка присутствует длительное время, обратитесь в&nbsp;службу&nbsp;поддержки.</p>
    </div>,

  "alert_contactsStartSessionDouble":
    <div>
      <p>У клиента уже есть открытая сессия.</p>
      <p>Чтобы создать новую сессию по данному клиенту, существующую необходимо закрыть&nbsp;или&nbsp;удалить.</p>
    </div>,

  "alert_contactsDelete":
    <p>Вы уверены, что хотите безвозвратно удалить клиента и все данные по сессиям с ним?</p>,

  "alert_contactsDeleteError":
    <div>
      <p>Произошла ошибка.</p>
      <p>Пожалуйста, повторите попытку удалить клиента сейчас или&nbsp;немного&nbsp;позднее.</p>
      <p>Если ошибка присутствует длительное время, обратитесь в&nbsp;службу&nbsp;поддержки.</p>
    </div>,

  "alert_contactsSubmitError":
    <div>
      <p>Произошла ошибка.</p>
      <p>Пожалуйста, повторите попытку сохранить изменения сейчас или&nbsp;немного&nbsp;позднее.</p>
      <p>Если ошибка присутствует длительное время, обратитесь в&nbsp;службу&nbsp;поддержки.</p>
    </div>,
  
  "alert_contactsInsert":
    <p>Клиент успешно добавлен.</p>,

  "alert_sessionsDelete":
    <p>Вы уверены, что хотите безвозвратно удалить сессию?</p>,

  "alert_sessionsDeleteError":
    <p style={{textAlign:'center'}}>Произошла ошибка.<br/>Повторите попытку удалить сессию или обратитесь в службу поддержки.</p>,

  "alert_sessionsClose":
    <p>Закрыть сессию и перенести ее в архив?</p>,

  "alert_sessionsCloseError":
    <p style={{textAlign:'center'}}>Произошла ошибка.<br/>Повторите попытку закрыть сессию или обратитесь в службу поддержки.</p>

}