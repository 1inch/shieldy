// Dependencies
import { Chat } from '../models'

export function strings(chat: Chat, key: string) {
  return (
    localizations[key][chat.language] ||
    `🤔 Localization not found, please, contact @borodutch.

Локализация не найдена, пожалуйста, напишите @borodutch.`
  )
}

export const localizations = {
  help: {
    ruen: `Shieldy — is the best solution in Telegram to fight annoying spammers. It asks newcomers to execute a set action within a set period, otherwise it kicks them. It's this easy. Make sure @shieldy\\_bot is an admin at your chat and it's all done! You can also further setup the behaviour with the following commands:

/help — shows this message
/language — switches language
/captcha — changes type of captcha used
/timeLimit — changes amount of time given to newcomers
/lock — makes commands accessible only by admins
/restrict — restricts newcomers to send only text messages in the first 24 hours
/deleteEntryMessages — delete messages about user entry
/greeting — greets users who pass the test

Still got questions? Check out the support channel — @borodutch\\_support. Shieldy code is open source and can be found [here](https://github.com/backmeupplz/shieldy). Thank you!

Shieldy — это лучшее решение в Телеграме по борьбе с надоедливыми спамерами. Он просит всех новичков сделать определенное действие в течение заданного времени и банит их, в случае несогласия. Да, это настолько просто. Убедитесь, что @shieldy\\_bot — админ в вашей группе, и все уже готово! Вы можете продолжить настройку бота, воспользовавшись следующими командами:

/help — показывает это сообщение
/language — меняет язык
/captcha — меняет тип капчи
/timeLimit — меняет количество времени, данное новичками
/lock — делает команды доступными только админами
/restrict — запрещает новичкам посылать что-либо, кроме текстовых сообщений в первые 24 часа
/deleteEntryMessages — удалять сообщения о входе пользователей в чат
/greeting — встречать прошедших проверку пользователей сообщением

Остались вопросы? Почитайте канал поддержки — @borodutch\\_support. Код Shieldy в открытом доступе [вот тут](https://github.com/backmeupplz/shieldy). Спасибо!`,
    en: `Shieldy — is the best solution in Telegram to fight annoying spammers. It asks newcomers to execute a set action within a set period, otherwise it kicks them. It's this easy. Make sure @shieldy\\_bot is an admin at your chat and it's all done! You can also further setup the behaviour with the following commands:

/help — shows this message
/language — switches language
/captcha — changes type of captcha used
/timeLimit — changes amount of time given to newcomers
/lock — makes commands accessible only by admins
/restrict — restricts newcomers to send only text messages in the first 24 hours
/deleteEntryMessages — delete messages about user entry
/greeting — greets users who pass the test

Still got questions? Check out the support channel — @borodutch\\_support. Shieldy code is open source and can be found [here](https://github.com/backmeupplz/shieldy). Thank you!`,
    ru: `Shieldy — это лучшее решение в Телеграме по борьбе с надоедливыми спамерами. Он просит всех новичков сделать определенное действие в течение заданного времени и банит их, в случае несогласия. Да, это настолько просто. Убедитесь, что @shieldy\\_bot — админ в вашей группе, и все уже готово! Вы можете продолжить настройку бота, воспользовавшись следующими командами:

/help — показывает это сообщение
/language — меняет язык
/captcha — меняет тип капчи
/timeLimit — меняет количество времени, данное новичками
/lock — делает команды доступными только админами
/restrict — запрещает новичкам посылать что-либо, кроме текстовых сообщений в первые 24 часа
/deleteEntryMessages — удалять сообщения о входе пользователей в чат
/greeting — встречать прошедших проверку пользователей сообщением

Остались вопросы? Почитайте канал поддержки — @borodutch\\_support. Код Shieldy в открытом доступе [вот тут](https://github.com/backmeupplz/shieldy). Спасибо!`,
    it: `Shieldy — è la soluzione migliore in Telegram per combattere gli spammers. Chiede ai nuovi utenti di fare un azione entro un periodo prestabilito, sennò verranno kickati. E' semplice. Assicurati che @shieldy\\_bot è un amministratore del gruppo ed è tutto pronto! Puoi anche impostare le azioni dei seguenti comandi:

/help — Mostra questo messaggio
/language — Modifica la lingua
/captcha — Modifica il tipo di Captche
/timeLimit — Modifica il tempo per i nuovi membri
/lock — Rendi accessibili alcuni comandi solo agli amministratori
/restrict — restricts newcomers to send only text messages in the first 24 hours
/deleteEntryMessages — delete messages about user entry
/greeting — greets users who pass the test

Still got questions? Check out the support channel — @borodutch\\_support. Shieldy code is open source and can be found [here](https://github.com/backmeupplz/shieldy). Thank you!`,
    et: `Shieldy — Telegrami parim lahendus ängistatavate rämpspostitajate vastu. Ta palub kõigil uustulnukitel teha mingi tegevus, teatud aja jooksul, kui nad ei ole seda teinud, siis see blokeerib neid. Jah, see on nii lihtne. Veenduge, et @shieldy\\_bot — administraator teie gruppis, ja kõik on valmis! Konfigureerige Shieldy kasutades järgmised käsud:

/help — näitab seda sõnumi
/language — muutub keelt
/captcha — muutub captcha tüüpi
/timeLimit — muutub uustilnukitele antud aega
/lock — muudab käsud kättesaadavaks ainult administraatoritele
/restrict — restricts newcomers to send only text messages in the first 24 hours
/deleteEntryMessages — delete messages about user entry
/greeting — greets users who pass the test

Veel küsimusi? Kirjutage minu loojale — @borodutch\\_support. Shieldy lähtekood on avatud [siin](https://github.com/backmeupplz/shieldy). Aitäh!`,
    uk: `Shieldy — це найкраще рішення в Телеграмі для боротьби з надокучливими спамерами. Він просить усіх новачків зробити певну дію протягом заданого часу і банить їх у разі незгоди. Так, це настільки просто! Переконайтеся, що @shieldy\\_bot — адміністратор у Вашій групі і усе вже готово! Ви можете продовжити налаштування бота, використавши наступні команди:

/help — показує це повідомлення
/language — змінює мову
/captcha — змінює тип капчі
/timeLimit — змінює кількість часу, що дається новачкам
/lock — робить команди доступними тільки адміністраторам
/restrict — забороняє новачкам надсилати будь-що, крім текстових повідомлень в перші 24 години
/deleteEntryMessages — видаляти повідомлення про вхід користувачів у чат
/greeting — greets users who pass the test
    
Залишились питання? Почитайте канал підтримки — @borodutch\\_support. Код Shieldy у відкритому доступі [ось тут](https://github.com/backmeupplz/shieldy). Дякуємо!`,
    br: `Shieldy — é a melhor solução em combater spammers no telegram. Ele pede para um novato realizar uma ação em determinado tempo, caso contrário o usuário é kickado. Fácil assim. Tenha certeza que @shieldy\\_bot é um ADM no seu grupo e estará tudo bem! Você ainda pode mudar o comportamento do bot com os seguintes comandos:

/help — mostra essa mensagem
/language — muda a língua
/captcha — muda o tipo de captcha usado
/timeLimit — muda o tempo dado para o novato realizar a ação
/lock — faz dos comandos acessíveis apenas pelos ADMs
/restrict - restringe o novato para mandar somente mensagens de texto nas primeiras 24 horas
/deleteEntryMessages — deleta a mensagem de entrada do usuário
/greeting — congratula o usuário que passou no teste

Ainda tem perguntas? De uma olhada no canal de suporte — @borodutch\\_support. O codigo do Shieldy é OpenSource e pode ser encontrado [aqui](https://github.com/backmeupplz/shieldy). Obrigado.`,
    tr: `Shieldy — Can sıkıcı spam göndericilerle savaşmak için Telegram'daki en iyi çözümdür. Yeni gelenlerden belirli bir süre içerisinde belirli bir eylemi gerçekleştirmesini ister. Aksi takdirde onları kovar. Bu çok kolay. @shieldy\\_bot botunun sohbetinizde yönetici olduğundan emin olun. Hepsi bu kadar! Davranışı ayrıca aşağıdaki komutlarla da ayarlayabilirsiniz:

/help — bu mesajı gösterir
/language — dili değiştirir
/captcha — kullanılan captcha türünü değiştirir
/timeLimit — yeni gelenlere verilen zaman miktarını değiştirir
/lock — komutları yalnızca yöneticiler tarafından erişilebilir hale getirir
/restrict — yeni gelenleri ilk 24 saatte yalnızca metin mesajı göndermeleri için kısıtlar
/deleteEntryMessages — kullanıcı girişi ile ilgili mesajları sil
/greeting — testi geçiren kullanıcıları selamlar

Hala sorularınız mı var? Destek kanalına göz atın: — @borodutch\\_support. Shieldy açık kaynaklıdır ve kod [burada](https://github.com/backmeupplz/shieldy) bulunabilir. Teşekkürler!`,
    es: `Shieldy — es la mejor solución en Telegram para luchar los molestos spammers. Pide a los recién llegados hacer una serie de acciones en un tiempo determinado, si no lo hacen los expulsa. Así de fácil. Asegúrate de que @shieldy\\_bot es administrador en el chat y listo! También puedes personalizar más su comportamiento con los siguientes comandos:

/help — muestra este mensaje
/language — cambia el idioma
/captcha — cambia el tipo de captcha usado
/timeLimit — cambia la cantidad de tiempo otorgada a los recién llegados
/lock — hace que estos comandos solo sean accesibles a los administradores
/restrict — restringe a los recién llegados a enviar solo mensajes de texto en las primeras 24 horas
/deleteEntryMessages — borra los mensajes sobre la entrada de usuarios
/greeting — saluda a los mensajes que pasan el test

¿Sigues con preguntas? Comprueba el canal de soporte — @borodutch\\_support. El código de Shieldy es código libre y puede ser encontrado [aquí](https://github.com/backmeupplz/shieldy). ¡Gracias!`,
  },
  language: {
    ruen: 'Please, select the language. Пожалуйста, выберите язык.',
    en: 'Please, select the language.',
    ru: 'Пожалуйста, выберите язык.',
    it: 'Prego, seleziona la lingua.',
    et: 'Palun valige keel.',
    uk: 'Будь ласка, виберіть мову.',
    br: 'Por favor, selecione uma língua.',
    tr: 'Lütfen dili seçin.',
    es: 'Por favor, selecciona el idioma.',
  },
  language_selected: {
    ruen:
      'Great, I speak Ruslish now. Отлично, я теперь говорю по-руслишски. О, да вы из Англии.',
    en: 'Great, I speak English now.',
    ru: 'Отлично, я теперь говорю по-русски.',
    it: 'Perfetto, Ora parlo Italiano.',
    et: 'Väga hea, nüüd ma räägin eesti keeles.',
    uk: 'Чудово, тепер я розмовляю українською.',
    br: 'Boa, Agora eu falo português.',
    tr: 'Harika, artık Türkçe konuşuyorum.',
    es: 'Genial, ahora hablo español.',
  },
  only_author_can_reply: {
    ruen:
      'Only the person who initiated the menu can select the choices. Только человек, вызвавший меню, может выбирать опции.',
    en: 'Only the person who initiated the menu can select the choices.',
    ru: 'Только человек, вызвавший меню, может выбирать опции.',
    it: 'Solamente chi ha invocato il comando può selezionarlo.',
    et: 'Ainult see, kes avas menüüd, saab valida valikud.',
    uk: 'Тільки людина, яка викликала меню, може вибирати опції.',
    br: 'Apenas a pessoa que iniciou o menu pode selecionar as opções.',
    tr: 'Sadece menüyü başlatan kişi seçenekleri seçebilir.',
    es: 'Solo la persona que inició el menú puede seleccionar las opciones.',
  },
  captcha: {
    ruen: `Please, select the test type for the newcomers:

• Simple — bot will ask to send anything to the chat
• Button — bot will ask to press a button
• Digits — bot will ask to solve a simple equation

Пожалуйста, выберите тип проверки новичков в чате:

• Простая — бот попросит прислать что угодно в чат
• Кнопкой — бот попросит нажать на кнопку
• Цифровая — бот попросит решить простое уравнение`,
    en: `Please, select the test type for the newcomers:

• Simple — bot will ask to send anything to the chat
• Button — bot will ask to press a button
• Digits — bot will ask to solve a simple equation`,
    ru: `Пожалуйста, выберите тип проверки новичков в чате:

• Простая — бот попросит прислать что угодно в чат
• Кнопкой — бот попросит нажать на кнопку
• Цифровая — бот попросит решить простое уравнение`,
    it: `Prego, seleziona uno dei seguenti test per i nuovi arrivati:

• Semplice — Il bot chiederà di inviare qualcunque messaggio in chat
• Bottone — Il bot chiederà di premere un pulsante`,
    et: `Palun valige uustulnukute kontrolli tüüp:

• Lihtne — bot küsib vestlusele midagi saata
• Nuppuga — bot küsib nuppu klõpsata.`,
    uk: `Будь ласка, виберіть тип перевірки новачків у чаті:

• Проста — бот просить надіслати що завгодно в чат
• Кнопкою — бот просить натиснути на кнопку.`,
    br: `Por favor, selecione o tipo de teste para os novatos:
    
• Simples - o bot vai pedir para mandar alguma coisa no chat
• Botão - o bot vai pedir para apertar um botão`,
    tr: `Lütfen, yeni gelenler için test türünü seçin:

• Basit — bot sohbet için bir şey göndermek isteyecektir
• Düğme — bot bir düğmeye basılmasını isteyecektir`,
    es: `Por favor, selecciona el tipo de test para los recién llegados:

• Simple — el bot pedirá enviar lo que sea por el chat
• Botón — el bot pedirá presionar un botón
• Digitos — el bot pedirá resolver una ecuación simple`,
  },
  simple: {
    ruen: 'Simple/Простая',
    en: 'Simple',
    ru: 'Простая',
    it: 'Semplice',
    et: 'Lihtne',
    uk: 'Проста',
    br: 'Simples',
    tr: 'Basit',
    es: 'Simple',
  },
  digits: {
    ruen: 'Digits/Цифровая',
    en: 'Digits',
    ru: 'Цифровая',
    it: 'Digita',
    et: 'Digitaalne',
    uk: 'Цифрова',
    br: 'Digitos',
    tr: 'Rakamlar',
    es: 'Digitos',
  },
  button: {
    ruen: 'Button/Кнопкой',
    en: 'Button',
    ru: 'Кнопкой',
    it: 'Bottone',
    et: 'Nuppuga',
    uk: 'Кнопкою',
    br: 'Botão',
    tr: 'Düğme',
    es: 'Botón',
  },
  captcha_selected: {
    ruen:
      'Great, I will use this type of test then. Отлично, теперь я буду использовать этот тип теста.',
    en: 'Great, I will use this type of test then.',
    ru: 'Отлично, теперь я буду использовать этот тип теста.',
    it: 'Fantastico, Userò questo tipo di test.',
    et: 'Väga hea, nüüd ma kasutan seda testi tüüpi.',
    uk: 'Чудово, тепер я буду використовувати цей тип тесту.',
    br: 'Boa, Eu irei usar esse tipo de teste agora.',
    tr: 'Harika, o zaman bu tür bir testi kullanacağım.',
    es: 'Genial, usaré este tipo de test.',
  },
  time_limit: {
    ruen:
      'Please, select how many seconds will newcomers get to complete the test before the kick. Пожалуйста, выберите, сколько секунд будет у новичков, чтобы завершить тест перед киком.',
    en:
      'Please, select how many seconds will newcomers get to complete the test before the kick.',
    ru:
      'Пожалуйста, выберите, сколько секунд будет у новичков, чтобы завершить тест перед киком.',
    it:
      'Prego, seleziona quanti secondi avrà il nuovo membro per completare il test prima di essere kickato',
    et:
      'Palun valige kui palju aega antud uustulnukatele, et testi sooritada enne kicki.',
    uk:
      'Будь ласка, виберіть, скільки секунд буде у новачків, щоб завершити тест перед кіком.',
    br:
      'Por favor, selecione quantos segundos o novato tem para completar o teste.',
    tr:
      'Lütfen, yeni gelenlerin kovulmadan önce testi tamamlaması gereken saniyeyi seçin.',
    es:
      'Por favor, seleccione cuántos segundos tendrán los recién llegados para completar el test antes de la expulsión.',
  },
  time_limit_selected: {
    ruen:
      'Great, I will use this time limit then. Отлично, теперь я буду использовать этот временной лимит.',
    en: 'Great, I will use this time limit then.',
    ru: 'Отлично, теперь я буду использовать этот временной лимит.',
    it: 'Magnifico, Ora userò questo tempo',
    et: 'Väga hea, nüüd ma kasutan seda aja limiiti.',
    uk: 'Чудово, тепер я буду використовувати це обмеження часу.',
    br: 'Boa, Eu irei usar esse tempo limite agora.',
    tr: 'Harika, o zaman bu süreyi kullanacağım.',
    es: 'Genial, usaré este límite de tiempo.',
  },
  seconds: {
    ruen: 'sec/сек',
    en: 'sec',
    ru: 'сек',
    it: 'sec',
    et: 'sek',
    uk: 'сек',
    br: 'sec',
    tr: 'san',
    es: 'seg',
  },
  lock_true: {
    ruen:
      'Great! Now I will only react to commands sent by admins. Отлично! Теперь я буду принимать команды только от админов.',
    en: 'Great! Now I will only react to commands sent by admins.',
    ru: 'Отлично! Теперь я буду принимать команды только от админов.',
    it: 'Perfetto, Ora eseguirò solamente i comandi inviati da amministratori.',
    et: 'Väga hea, nüüd ma aktsepteerin ainult administraatorite käske.',
    uk: 'Чудово! Тепер я буду приймати команди тільки від адміністраторів.',
    br: 'Boa! Agora só obedecerei os ADMs.',
    es: '¡Genial! Ahora solo reaccionaré a los comandos enviados por administradores.',
    tr:
      'Harika! Artık sadece yöneticiler tarafından gönderilen komutlara tepki vereceğim.',
  },
  lock_false: {
    ruen:
      'Great! Now I will react to commands sent by anybody. Отлично! Теперь я буду принимать команды ото всех.',
    en: 'Great! Now I will react to commands sent by anybody.',
    ru: 'Отлично! Теперь я буду принимать команды ото всех.',
    it: 'Perfetto, Ora eseguirò i comandi inviati da tutti.',
    et: 'Väga hea, nüüd ma aktsepteerin kõik käsud.',
    uk: 'Чудово! Тепер я буду приймати команди від усіх.',
    br: 'Boa! Agora obedecerei a qualquer pessoa.',
    tr: 'Harika! Artık herkes tarafından gönderilen komutlara tepki vereceğim.',
    es: '¡Genial! Ahora reaccionaré a los comandos enviador por todo el mundo.',
  },
  simple_warning: {
    ruen: `, please, send any message to this group within the time amount specified, otherwise you will be kicked. Thank you!
      
  Пожалуйста, отправьте любое сообщение в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!`,
    en:
      ', please, send any message to this group within the time amount specified, otherwise you will be kicked. Thank you!',
    ru:
      ', пожалуйста, отправьте любое сообщение в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
    it:
      ', prego, invia un messaggio in questo gruppo entro il tempo specificato, altrimenti verrai kickato. Grazie!',
    et:
      ', palun saatke mis tahes sõnum sellele vestlusele määratud aja jooksul, muidu me kickime teid. Aitäh!',
    uk:
      ', будь ласка, надішліть будь-яке повідомлення в цей чат протягом зазначеного часу, інакше Ви будете кікнуті. Дякуємо!',
    br:
      ', Por favor, mande qualquer mensagem para esse grupo com o tempo limite especificado, caso contrário irei kicka-lo. Obrigado!',
    tr:
      ', Lütfen, belirtilen süre içerisinde bu gruba herhangi bir mesaj gönderin, aksi takdirde atılırsınız. Teşekkürler!',
    es:
      ', por favor, envía cualquier mensaje por este grupo dentro del tiempo especificado, si no, serás expulsado. ¡Gracias!',
  },
  digits_warning: {
    ruen: `, please, send the solution to the math equation provided within the time amount specified to this group, otherwise you will be kicked. Thank you!
      
Пожалуйста, отправьте решение указанного математического уравнения в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!`,
    en:
      ', please, send the solution to the math equation provided within the time amount specified to this group, otherwise you will be kicked. Thank you!',
    ru:
      ', пожалуйста, отправьте решение указанного математического уравнения в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
    it:
      ", prego, invia la soluzione dell'equazione matematica in questo gruppo entro il tempo specificato, altrimenti verrai kickato. Grazie!",
    et:
      ', palun saatke matemaatilise võrrandi lahendus sellele vestlusele määratud aja jooksul, muidu me kickime teid. Aitäh!',
    uk:
      ', будь ласка, надішліть рішення зазначеного математичного рівняння в цей чат протягом зазначеного часу, інакше Ви будете кікнуті. Дякуємо!',
    br:
      ', Por favor, mande a solução da equação matemática para esse grupo no tempo limite especificado, caso contrário irei kicka-lo. Obrigado!',
    tr:
      ', Lütfen, çözümü bu gruba belirtilen süre içinde sağlanan matematik denklemine gönderin, aksi takdirde atılacaksınız. Teşekkürler!',
    es:
      ', por favor, envíe por este grupo la solución a la ecuación matemática proporcionada dentro del tiempo especificado, si no, serás expulsado. ¡Gracias!',
  },
  button_warning: {
    ruen: `, please, press the button below within the time amount specified, otherwise you will be kicked. Thank you!
            
Пожалуйста, нажмите на кнопку ниже в течение указанного времени, иначе вы будете кикнуты. Спасибо!`,
    en:
      ', please, press the button below within the time amount specified, otherwise you will be kicked. Thank you!',
    ru:
      ', пожалуйста, нажмите на кнопку ниже в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
    it:
      ', prego, clicca il bottone qui sotto entro il tempo prestabilito, altrimenti verrai kickato. Grazie!',
    et:
      ', palun klõpsake alam nuppu määratud aja jooksul, muide me kickime teid. Aitäh!',
    uk:
      ', будь ласка, натисніть на кнопку нижче протягом зазначеного часу, інакше Ви будете кікнуті. Дякуємо!',
    br:
      ', Por favor, aperte o botão abaixo no tempo limite especificado, caso contrário irei kicka-lo, Obrigado!',
    tr:
      ', Lütfen, belirtilen süre içinde aşağıdaki düğmeye basın, aksi takdirde atılacasınız. Teşekkürler!',
    es:
      ', por favor, presione el botón abajo dentro del tiempo especificado, si no, serás expulsado. ¡Gracias!',
  },
  captcha_button: {
    ruen: 'Not a bot. Не бот.',
    en: 'I am not a bot',
    ru: 'Я не бот',
    it: 'Non sono un bot',
    et: 'Ma ei ole bot',
    uk: 'Я не бот',
    br: 'Não sou um robô',
    tr: 'Ben bir bot değilim',
    es: 'No soy un robot',
  },
  only_candidate_can_reply: {
    ruen:
      'Only the candidate for not being a bot can press this button. Только кандидат на то, чтобы быть человеком, может нажимать на эту кнопку.',
    en: 'Only the candidate for not being a bot can press this button.',
    ru:
      'Только кандидат на то, чтобы быть человеком, может нажимать на эту кнопку.',
    it: 'Solamente il candidato che non è un bot può premere questo bottone.',
    et: 'Selle nuppu saab klõpsata ainult kandidaat, kes soovib olla inimene.',
    uk: 'Тільки кандидат на те, щоб бути людиною, може натискати на цю кнопку.',
    br: 'Apenas o usuário citado pode apertar esse botão.',
    tr: 'Sadece bot olmayan bir aday bu düğmeye basabilir.',
    es: 'Solo el candidato para no ser un roobot puede presionar este botón.',
  },
  restrict_true: {
    ruen:
      'Great! Now all newcomers will only be able to send usual text messages to this chat. Отлично! Теперь все новички смогут отправлять только текстовые сообщения первые сутки в чате.',
    en:
      'Great! Now all newcomers will only be able to send usual text messages to this chat.',
    ru:
      'Отлично! Теперь все новички смогут отправлять только текстовые сообщения первые сутки в чате.',
    it:
      'Great! Now all newcomers will only be able to send usual text messages to this chat.',
    et:
      'Great! Now all newcomers will only be able to send usual text messages to this chat.',
    uk:
      'Чудово! Тепер усі новачки протягом першої доби зможуть надсилати в чат тільки текстові повідомлення.',
    br:
      'Boa, Agora todos os novatos só poderam mandar mensagens de texto para esse chat.',
    tr:
      'Harika! Artık tüm yeni gelenler, bu sohbete yalnızca normal metin mesajları gönderebilecek.',
    es:
      '¡Genial! Ahora todos los recién llegados solo podrán enviar mensajes ordinarios a este chat.',
  },
  restrict_false: {
    ruen:
      'Great! Now all newcomers will be able to send any type of content to this chat. Отлично! Теперь все новички смогут отправлять любые сообщения в этот чат.',
    en:
      'Great! Now all newcomers will be able to send any type of content to this chat.',
    ru:
      'Отлично! Теперь все новички смогут отправлять любые сообщения в этот чат.',
    it:
      'Great! Now all newcomers will be able to send any type of content to this chat.',
    et:
      'Great! Now all newcomers will be able to send any type of content to this chat.',
    uk:
      'Чудово! Тепер усі новачки зможуть надсилати будь-які повідомлення в чат.',
    br:
      'Boa, Agora todos os novatos poderam mandar qualquer tipo de conteúdo para esse chat.',
    tr:
      'Harika! Artık tüm yeni kullanıcılar, bu sohbete her türlü içeriği gönderebilecek.',
    es:
      '¡Genial! Ahora todos los recién llegados pueden enviar cualquier tipo de contenido a este chat.',
  },
  deleteEntryMessages_true: {
    ruen:
      'Great! Now entry messages will be deleted. Отлично! Теперь сообщения о входе пользователей будут удаляться.',
    en: 'Great! Now entry messages will be deleted.',
    ru: 'Отлично! Теперь сообщения о входе пользователей будут удаляться.',
    it: 'Great! Now entry messages will be deleted.',
    et: 'Great! Now entry messages will be deleted.',
    uk:
      'Чудово! Тепер повідомлення про вхід користувачів в чат будуть видалятися.',
    br: 'Boa, Agora a mensagem de entrada será apagada.',
    tr: 'Harika! Artık giriş mesajları silinecektir.',
    es: '¡Genial! Ahora los mensajes de entrada serán borrados.',
  },
  deleteEntryMessages_false: {
    ruen:
      'Great! Now entry messages will not be deleted. Отлично! Теперь сообщения о входе пользователей не будут удаляться.',
    en: 'Great! Now entry messages will not be deleted.',
    ru: 'Отлично! Теперь сообщения о входе пользователей не будут удаляться.',
    it: 'Great! Now entry messages will not be deleted.',
    et: 'Great! Now entry messages will not be deleted.',
    uk:
      'Чудово! Тепер повідомлення про вхід користувачів в чат не будуть видалятися.',
    br: 'Boa, Agora a mensagem de entrada não será apagada.',
    tr: 'Harika! Artık giriş mesajları silinmeyecek.',
    es: '¡Genial! Ahora los mensajes de entrada no serán borrados.',
  },
  greetsUsers_true: {
    ruen:
      'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username). Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username).',
    en:
      'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username).',
    ru:
      'Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username).',
    it:
      'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use.',
    et:
      'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use.',
    uk:
      'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use.',
    br:
      'Boa! Agora os novatos que passarem no teste não serão congratulados. Por favor, responda essa mensagem com a o texto de congratulações que você gostaria de usar.',
    tr:
      'Harika! Artık testi geçen yeni üyeler karşılanmayacak. Lütfen bu mesajı, kullanmak istediğiniz tebrik metni ile yanıtlayın ($title ve $username kullanabilirsiniz).',
    es:
      '¡Genial! Ahora los recién llegados que hayan pasado el test no serán saludados. Por favor, responde a este mensaje con el texto de saludo que quieres utilizar (puedes usar $title y $username).',
  },
  greetsUsers_true_message: {
    ruen:
      'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username). The current greeting message follows. Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username). Текущее сообщение с приветствием ниже.',
    en:
      'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username). The current greeting message follows.',
    ru:
      'Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username). Текущее сообщение с приветствием ниже.',
    it:
      'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use. The current greeting message follows.',
    et:
      'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use. The current greeting message follows.',
    uk:
      'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use. The current greeting message follows.',
    br:
      'Boa! Agora os novatos que passarem no teste serão congratulados. Por favor, responda essa mensagem com o texto de congratulações que você gostaria de usar. O texto atual é:',
    tr:
      'Harika! Artık testi geçen yeni üyeler karşılanacak. Lütfen bu mesajı, kullanmak istediğiniz tebrik metni ile yanıtlayın ($title ve $username kullanabilirsiniz). Geçerli tebrik mesajı aşağıdaki gibidir.',
    es:
      '¡Genial! Ahora los recién llegados que hayan pasado el test serán saludados. Por favor, responde a este mensaje con el texto de saludo que quieres utilizar (puedes usar $title y $username). El mensaje actual de saludo es:',
  },
  greetsUsers_false: {
    ruen:
      'Great! Now newcomers who passed the test will not be greeted. Отлично! Теперь пользователи, прошедшие проверку, не будут получать сообщения с приветствиями.',
    en: 'Great! Now newcomers who passed the test will not be greeted.',
    ru:
      'Отлично! Теперь пользователи, прошедшие проверку, не будут получать сообщения с приветствиями.',
    it: 'Great! Now newcomers who passed the test will not be greeted',
    et: 'Great! Now newcomers who passed the test will not be greeted',
    uk: 'Great! Now newcomers who passed the test will not be greeted',
    br: 'Boa! Agora os novatos que passarem no teste não serão congratulados',
    tr: 'Harika! Artık testi geçen yeni üyeler karşılanmayacak.',
    es: '¡Genial! Ahora los recién llegados que pasen el test no serán saludados.',
  },
  greetsUsers_message_accepted: {
    ruen: 'Accepted! Принято!',
    en: 'Accepted!',
    ru: 'Принято!',
    it: 'Accepted!',
    et: 'Accepted!',
    uk: 'Accepted!',
    br: 'Aceito!',
    tr: 'Kabul edildi!',
    es: '¡Aceptado!',
  },
}
