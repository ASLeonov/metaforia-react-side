export const validateField = (props) => {
  const [name, value, isRequired] = props

  const value_with_tags = value.match(/<\/?[a-zA-Z]+>/gi)

  if (isRequired) {
    
    if ( (name === 'email' || name === 'login') && !value.includes('@') ) {
      return false
    } else if ( (value_with_tags && value_with_tags.length > 0) || value.replace(/ /gi,'').length === 0 ) {
      return false
    } else {
      return true
    }

  } else {
    
    if (value_with_tags && value_with_tags.length > 0) {
      return false
    } else {
      return true
    }
  }

}

// ПРОВЕРЕНО 

// Корректная работа:
// Если поле обязательное (isRequired), то проверяется на совпадение по тегам html и на ненулевую длину после удаления пробелов.
// Если поле и isRequired и email, то также проверяется наличие символа '@'.
// Если необязательное - проверка на совпадение по тегам html.
// Если проверка пройдена успешно - возвращает true, если нет - false.



