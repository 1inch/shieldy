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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

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
/trust — ответьте этой командой на сообщение пользователя, которого не нужно проверять
/strict — используйте, если не хотите получать никакие сообщения от новичков кроме решения капчи, до прохождения капчи

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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

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
/trust — ответьте этой командой на сообщение пользователя, которого не нужно проверять
/strict — используйте, если не хотите получать никакие сообщения от новичков кроме решения капчи, до прохождения капчи

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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

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
/trust — reply with this command to a message sent by user that you don't want to check
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

¿Sigues con preguntas? Comprueba el canal de soporte — @borodutch\\_support. El código de Shieldy es código libre y puede ser encontrado [aquí](https://github.com/backmeupplz/shieldy). ¡Gracias!`,
    zh: `Shieldy  - 是电报中打击恼人的垃圾信息发送者的最佳解决方案，它要求新手在一段时间内执行一个集合动作，否则就会踢它们，就这么简单。确保 @shieldy\\_bot是您的管理员，并且这就可以了！您还可以使用以下命令进一步设置课程：

/help  - 显示此消息
/language  - 切换语言
/captcha  - 更改使用的验证码类型
/timeLimit  - 更改给新手的时间
/lock  - 使命令只能由管理员访问
/restrict  - 限制新手在前24小时内仅能发送纯文本消息
/deleteEntryMessages  - 删除有关用户加入的消息
/greeting  - 迎接通过测试的用户
/trust  - 使用此命令回复用户发送的您不想检查的消息
/strict  - 当你不希望收到任何新手的消息但使用验证码解决方案直到他们通过验证码时使用

还有问题吗？查看支持渠道 -  @borodutch\\_support。 Shieldy代码是开源的，可以在[这里](https://github.com/backmeupplz/shieldy)找到。谢谢！`,
    no: `Shieldy — er den beste løsningen i Telegram for å holde irriterende falske kontoer tilbake. Den spørr nykommere om å utføre et sett med handlinger innenfor er viss tidsperiode, hvis ikke blir brukeren kastet ut. Det er så enkelt. Gjør @shieldy\\_bot til admin i chatten din og alt er klart! Du kan videre endre oppførselen med de følgende kommandoene:

/help — viser denne meldingen
/language — bytter språk
/captcha — endrer hvilken type captcha som blir brukt
/timeLimit — endrer hvor mye tid som blir gitt til nykommere
/lock — gjør kommandoer tilgjengelig bare for administratorer
/restrict — begrenser nykommere til å bare kunne sende tekstmeldinger de første 24 timene
/deleteEntryMessages — sletter meldinger om brukerens adkomst
/greeting — sender en velkomst når en bruker består testen
/trust — svar med denne kommandoen til en melding sendt av en bruker du ikke vil skal sjekkes
/strict — bruk når du ikke vil motta nykommernes meldinger untatt captcha løsninger før de har bestått testen

Har du fortsatt spørsmål? Sjekk ut vår støtte-kanal — @borodutch\\_support. Shieldy's kode er åpen og kan bli funnet [her](https://github.com/backmeupplz/shieldy). Takk!`,
    de: `Shieldy — is the best solution in Telegram to fight annoying spammers. It asks newcomers to execute a set action within a set period, otherwise it kicks them. It's this easy. Make sure @shieldy\\_bot is an admin at your chat and it's all done! You can also further setup the behaviour with the following commands:

/help — zeigt diese Nachricht an
/language — ändert Sprachen
/captcha — ändert die Art des Captchas, welches genutzt wird
/timeLimit — ändert die menge Zeit welche neue User bekommen
/lock — lässt Kommandos nur von Admins zu
/restrict — schränkt neue User ein, für die ersten 24 Stunden nur Text Nachrichten zu senden
/deleteEntryMessages — löscht Nachrichten über den User Eintrag
/greeting — begrüßt die User, welche den Test bestehen
/trust — antworte mit diesem Kommando auf eine vorherige Nachricht, um diesen User nicht mehr zu überprüfen
/strict — use when you don't want to receive any newcomers' messages but captcha solutions until they pass captcha

Still got questions? Check out the support channel — @borodutch\\_support. Shieldy code is open source and can be found [here](https://github.com/backmeupplz/shieldy). Thank you!`,
id: `Shieldy adalah solusi terbaik untuk melawan spammer di Telegram. Yaitu dengan menguji anggota baru dengan melakukan sesuatu dalam batas waktu tertentu, jika gagal maka anggota baru akan ditolak bergabung. Pastikan @shieldy\\_bot menjadi admin di grup anda. Tersedia pengaturan tambahan dengan perintah berikut:

/help — menampilkan pesan bantuan ini
/language — mengganti pilihan bahasa
/captcha — mengubah jenis ujian yg dipakai
/timeLimit — mengubah batasan waktu ujian
/lock — batasi perintah hanya bisa dijalankan oleh admin saja
/restrict — batasi anggota baru hanya boleh mengirim pesan teks dalam 24 jam pertama
/deleteEntryMessages — hapus pesan sambutan pada anggota baru
/greeting — pesan sambutan pada anggota baru yg lolos ujian
/trust — balas dengan pesan ini ke anggota untuk meloloskannya tanpa ujian
/strict — larang anggota baru mengirim pesan apa pun jika belum lolos ujian

Masih ada pertanyaan? Gabung saja dengan kanal @borodutch\\_support. Shieldy berkode terbukan dan tersedia di [sini](https://github.com/backmeupplz/shieldy). Terima kasih!`,

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
    zh: '请选择一种语言。',
    no: 'Vennligst velg et språk.',
    de: 'Bitte wähle eine Sprache.',
    id: 'Silakan pilih bahasa.',
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
    zh: '很棒，现在我讲中文了。',
    no: 'Supert, nå snakker jeg norsk.',
    de: 'Großartig, ich spreche nun deutsch.',
    id: 'Baiklah. Saya berbahasa Indonesia sekarang.',
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
    zh: '只有启动菜单的人才能选择。',
    no: 'Bare personen som åpnet menyen kan svare på den.',
    de: 'Nur die Person, welche das Menü initialisiert hat, kann Einstellungen vornehmen.',
    id: 'Hanya orang yg meminta menu yg bisa menentukan pilihan.',
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
• Bottone — Il bot chiederà di premere un pulsante
• Digits — bot will ask to solve a simple equation`,
    et: `Palun valige uustulnukute kontrolli tüüp:

• Lihtne — bot küsib vestlusele midagi saata
• Nuppuga — bot küsib nuppu klõpsata.`,
    uk: `Будь ласка, виберіть тип перевірки новачків у чаті:

• Проста — бот просить надіслати що завгодно в чат
• Кнопкою — бот просить натиснути на кнопку.
• Digits — bot will ask to solve a simple equation`,
    br: `Por favor, selecione o tipo de teste para os novatos:

• Simples - o bot vai pedir para mandar alguma coisa no chat
• Botão - o bot vai pedir para apertar um botão
• Digits — bot will ask to solve a simple equation`,
    tr: `Lütfen, yeni gelenler için test türünü seçin:

• Basit — bot sohbet için bir şey göndermek isteyecektir
• Düğme — bot bir düğmeye basılmasını isteyecektir
• Digits — bot will ask to solve a simple equation`,
    es: `Por favor, selecciona el tipo de test para los recién llegados:

• Simple — el bot pedirá enviar lo que sea por el chat
• Botón — el bot pedirá presionar un botón
• Digitos — el bot pedirá resolver una ecuación simple
• Digits — bot will ask to solve a simple equation`,
    zh: `请为新人选择测试类型：

•简单 - 机器人会要求向聊天发送任何内容
•按钮 - 机器人将要求按下一个按钮
•数字 - 机器人将要求解决一个简单的等式`,
    no: `Vennligst velg testtypen for nykommere:

• Enkel — botten vil spørre om å sende hva som helst i chatten
• Knapp — botten vil spørre om å trykke en knapp
• Tall — botten vil spørre om å løse et enkelt matteproblem`,
    de: `Bitte wähle aus, wie der Bot neue User testen wird:

• Simpel — Der Bot wird fragen, irgendwas in den Chat zu senden
• Knopf — Der Bot wird fragen, einen Knopf zu drücken
• Nummern — Der Bot wird eine simple Mathe-Aufgabe stellen`,
    id: `Silakan pilih jenis ujian untuk anggota baru:

• Salam  — bot akan meminta salam perkenalan
• Tombol — bot akan meminta menekan tombol
• Angka  — bot akan meminta jawaban hitungan`,
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
    zh: '简单',
    no: 'Enkel',
    de: 'Simpel',
    id: 'Salam',
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
    zh: '数字',
    no: 'Tall',
    de: 'Zahlen',
    id: 'Angka',
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
    zh: '按钮',
    no: 'Knapp',
    de: 'Knopf',
    id: 'Tombol',
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
    zh: '很棒，我之后会使用这个类型的测试',
    no: 'Supert, da vil jeg bruke denne type testen.',
    de: 'Großartig, ich werde diese Art des Tests nutzen.',
    id: 'Baiklah, jenis ujian tersebut yg akan dipakai.',
  },
  time_limit: {
    ruen:
      'Please, select how many seconds will newcomers get to complete the test before the kick. Пожалуйста, выберите, сколько секунд будет у новичков, чтобы завершить тест перед киком.',
    en: 'Please, select how many seconds will newcomers get to complete the test before the kick.',
    ru: 'Пожалуйста, выберите, сколько секунд будет у новичков, чтобы завершить тест перед киком.',
    it: 'Prego, seleziona quanti secondi avrà il nuovo membro per completare il test prima di essere kickato',
    et: 'Palun valige kui palju aega antud uustulnukatele, et testi sooritada enne kicki.',
    uk: 'Будь ласка, виберіть, скільки секунд буде у новачків, щоб завершити тест перед кіком.',
    br: 'Por favor, selecione quantos segundos o novato tem para completar o teste.',
    tr: 'Lütfen, yeni gelenlerin kovulmadan önce testi tamamlaması gereken saniyeyi seçin.',
    es: 'Por favor, seleccione cuántos segundos tendrán los recién llegados para completar el test antes de la expulsión.',
    zh: '请选择新人在被踢除前完成测试的秒数。',
    no: 'Vennligst velg hvor mange sekunder nykommere vil ha på å fullføre testen før brukeren blir sparket.',
    de: 'Please, select how many seconds will newcomers get to complete the test before the kick.',
    id: 'Silakan tentukan berapa detik yg dibutuhkan anggota baru untuk menanggapi sebelum ditolak bergabung.',
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
    zh: '很棒，我之后会使用这个时间限制。',
    no: 'Supert, da skal jeg bruke denne tidsbegrensningen.',
    de: 'Great, I will use this time limit then.',
    id: 'Baiklah, batas waktu tersebut yg akan dipakai.',
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
    zh: '秒',
    no: 'sek',
    de: 'sek',
    id: 'det',
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
    tr: 'Harika! Artık sadece yöneticiler tarafından gönderilen komutlara tepki vereceğim.',
    zh: '很棒！现在我只对管理员发送的命令作出反应。',
    no: 'Supert! Nå vil jeg bare svare på kommandoer gitt av administratorer.',
    de: 'Great! Now I will only react to commands sent by admins.',
    id: 'Baiklah, sekarang saya hanya menanggapi perintah dari admin saja.',
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
    zh: '很棒！现在我对所有人发出的命令做出反应。',
    no: 'Supert! Nå vil jeg svare på kommandoer gitt av hvem som helst.',
    de: 'Great! Now I will react to commands sent by anybody.',
    id: 'Baiklah, sekarang saya akan menanggapi perintah dari siapa pun.',
  },
  strict_true: {
    ruen:
      "Great! Now newcomers won't send anything but captcha solutions until they pass captcha. Отлично! Теперь новички не смогут присылать ничего кроме решения капчи, до прохождения капчи.",
    en: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    ru: 'Отлично! Теперь новички не смогут присылать ничего кроме решения капчи, до прохождения капчи.',
    it: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    et: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    uk: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    br: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    es: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    tr: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    zh: "很棒！现在新手在通过验证码之前不会发送除验证码解决方案之外的任何内容。",
    no: "Supert! Nå kan ikke nykommere sende noe før de har bestått testen.",
    de: "Great! Now newcomers won't send anything but captcha solutions until they pass captcha.",
    id: "Baiklah, sekarang anggota baru tidak bisa mengirim apa pun hingga menanggapi ujian dengan benar.",
  },
  strict_false: {
    ruen:
      'Great! Now newcomers will be able to send text before they pass captcha. Отлично! Теперь новички смогут отправлять текст до прохождения капчи.',
    en: 'Great! Now newcomers will be able to send text before they pass captcha.',
    ru: 'Отлично! Теперь новички смогут отправлять текст до прохождения капчи.',
    it: 'Great! Now newcomers will be able to send text before they pass captcha.',
    et: 'Great! Now newcomers will be able to send text before they pass captcha.',
    uk: 'Great! Now newcomers will be able to send text before they pass captcha.',
    br: 'Great! Now newcomers will be able to send text before they pass captcha.',
    tr: 'Great! Now newcomers will be able to send text before they pass captcha.',
    es: 'Great! Now newcomers will be able to send text before they pass captcha.',
    zh: '很棒！现在，新手可以在通过验证码之前发送文本消息。',
    no: 'Supert! Nå kan nykommere sende meldinger før de har bestått testen.',
    de: 'Great! Now newcomers will be able to send text before they pass captcha.',
    id: 'Baiklah, sekarang anggota baru boleh mengirim pesan walaupun belum menanggapi ujian.',
  },
  simple_warning: {
    ruen: `, please, send any message to this group within the time amount specified, otherwise you will be kicked. Thank you!

  Пожалуйста, отправьте любое сообщение в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!`,
    en: ', please, send any message to this group within the time amount specified, otherwise you will be kicked. Thank you!',
    ru: ', пожалуйста, отправьте любое сообщение в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
    it: ', prego, invia un messaggio in questo gruppo entro il tempo specificato, altrimenti verrai kickato. Grazie!',
    et: ', palun saatke mis tahes sõnum sellele vestlusele määratud aja jooksul, muidu me kickime teid. Aitäh!',
    uk: ', будь ласка, надішліть будь-яке повідомлення в цей чат протягом зазначеного часу, інакше Ви будете кікнуті. Дякуємо!',
    br: ', Por favor, mande qualquer mensagem para esse grupo com o tempo limite especificado, caso contrário irei kicka-lo. Obrigado!',
    tr: ', Lütfen, belirtilen süre içerisinde bu gruba herhangi bir mesaj gönderin, aksi takdirde atılırsınız. Teşekkürler!',
    es: ', por favor, envía cualquier mensaje por este grupo dentro del tiempo especificado, si no, serás expulsado. ¡Gracias!',
    zh: '，请在指定的时间内向该群组发送任何消息，否则您将被踢。谢谢！',
    no: ', vennligst send hvilken som helst melding til denne gruppen innen den spesifiserte tidsperioden, hvis ikke blir du sparket. Takk!',
    de: ', bitte sende jede Nachricht innerhalb des spezifizierten Zeitlimits, andernfalls wirst du gekickt. Danke!',
    id: ', silakan sampaikan salam perkenalan dalam waktu yg ditentukan atau anda akan ditolak bergabung dengan grup ini. Terima kasih!',
  },
  digits_warning: {
    ruen: `, please, send the solution to the math equation provided within the time amount specified to this group, otherwise you will be kicked. Thank you!

Пожалуйста, отправьте решение указанного математического уравнения в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!`,
    en: ', please, send the solution to the math equation provided within the time amount specified to this group, otherwise you will be kicked. Thank you!',
    ru: ', пожалуйста, отправьте решение указанного математического уравнения в этот чат в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
    it: ", prego, invia la soluzione dell'equazione matematica in questo gruppo entro il tempo specificato, altrimenti verrai kickato. Grazie!",
    et: ', palun saatke matemaatilise võrrandi lahendus sellele vestlusele määratud aja jooksul, muidu me kickime teid. Aitäh!',
    uk: ', будь ласка, надішліть рішення зазначеного математичного рівняння в цей чат протягом зазначеного часу, інакше Ви будете кікнуті. Дякуємо!',
    br: ', Por favor, mande a solução da equação matemática para esse grupo no tempo limite especificado, caso contrário irei kicka-lo. Obrigado!',
    tr: ', Lütfen, çözümü bu gruba belirtilen süre içinde sağlanan matematik denklemine gönderin, aksi takdirde atılacaksınız. Teşekkürler!',
    es: ', por favor, envíe por este grupo la solución a la ecuación matemática proporcionada dentro del tiempo especificado, si no, serás expulsado. ¡Gracias!',
    zh: '，请在指定的时间内将数学计算答案发送到本群组，否则您将被踢。 谢谢！',
    no: ', vennligst send svaret på matteproblemet innen den spesifiserte tidsperioden, hvis ikke blir du sparket. Takk!',
    de: ', bitte sende die Lösung zu der Mathe-Aufgabe innerhalb des spezifizierten Zeitlimits, andernfalls wirst du gekickt. Danke!',
    id: ', silakan jawab soal hitungan tersebut dalam waktu yg ditentukan atau anda akan ditolak bergabung dengan grup ini. Terima kasih!',
  },
  button_warning: {
    ruen: `, please, press the button below within the time amount specified, otherwise you will be kicked. Thank you!

Пожалуйста, нажмите на кнопку ниже в течение указанного времени, иначе вы будете кикнуты. Спасибо!`,
    en: ', please, press the button below within the time amount specified, otherwise you will be kicked. Thank you!',
    ru: ', пожалуйста, нажмите на кнопку ниже в течение указанного времени, иначе вы будете кикнуты. Спасибо!',
    it: ', prego, clicca il bottone qui sotto entro il tempo prestabilito, altrimenti verrai kickato. Grazie!',
    et: ', palun klõpsake alam nuppu määratud aja jooksul, muide me kickime teid. Aitäh!',
    uk: ', будь ласка, натисніть на кнопку нижче протягом зазначеного часу, інакше Ви будете кікнуті. Дякуємо!',
    br: ', Por favor, aperte o botão abaixo no tempo limite especificado, caso contrário irei kicka-lo, Obrigado!',
    tr: ', Lütfen, belirtilen süre içinde aşağıdaki düğmeye basın, aksi takdirde atılacasınız. Teşekkürler!',
    es: ', por favor, presione el botón abajo dentro del tiempo especificado, si no, serás expulsado. ¡Gracias!',
    zh: '，请在指定的时间内按下面的按钮，否则你将被踢。谢谢！',
    no: 'vennligst trykk knappen nedenfor innen den spesifiserte tidsperioden, hvis ikke blir du sparket. Takk!',
    de: ', bitte drücke den Knopf unten innerhalb des spezifizierten Zeitlimits, andernfalls wirst du gekickt. Danke!',
    id: ', silakan tekan tombol dalam waktu yg ditentukan atau anda akan ditolak bergabung dengan grup ini. Terima kasih!',
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
    zh: '我不是一个机器人',
    no: 'Jeg er ikke en bot',
    de: 'Ich bin kein Bot',
    id: 'Saya bukan bot',
  },
  only_candidate_can_reply: {
    ruen:
      'Only the candidate for not being a bot can press this button. Только кандидат на то, чтобы быть человеком, может нажимать на эту кнопку.',
    en: 'Only the candidate for not being a bot can press this button.',
    ru: 'Только кандидат на то, чтобы быть человеком, может нажимать на эту кнопку.',
    it: 'Solamente il candidato che non è un bot può premere questo bottone.',
    et: 'Selle nuppu saab klõpsata ainult kandidaat, kes soovib olla inimene.',
    uk: 'Тільки кандидат на те, щоб бути людиною, може натискати на цю кнопку.',
    br: 'Apenas o usuário citado pode apertar esse botão.',
    tr: 'Sadece bot olmayan bir aday bu düğmeye basabilir.',
    es: 'Solo el candidato para no ser un roobot puede presionar este botón.',
    zh: '只有不是机器人的候选人才能按此按钮。',
    no: 'Bare kandidaten som blir testet kan trykke denne knappen.',
    de: 'Nur der Kandiat für kein Bot zu sein, kann diesen Knopf drücken.',
    id: 'Hanya orang alias bukan bot yg bisa menekan tombol ini.',
  },
  restrict_true: {
    ruen:
      'Great! Now all newcomers will only be able to send usual text messages to this chat. Отлично! Теперь все новички смогут отправлять только текстовые сообщения первые сутки в чате.',
    en: 'Great! Now all newcomers will only be able to send usual text messages to this chat.',
    ru: 'Отлично! Теперь все новички смогут отправлять только текстовые сообщения первые сутки в чате.',
    it: 'Great! Now all newcomers will only be able to send usual text messages to this chat.',
    et: 'Great! Now all newcomers will only be able to send usual text messages to this chat.',
    uk: 'Чудово! Тепер усі новачки протягом першої доби зможуть надсилати в чат тільки текстові повідомлення.',
    br: 'Boa, Agora todos os novatos só poderam mandar mensagens de texto para esse chat.',
    tr: 'Harika! Artık tüm yeni gelenler, bu sohbete yalnızca normal metin mesajları gönderebilecek.',
    es: '¡Genial! Ahora todos los recién llegados solo podrán enviar mensajes ordinarios a este chat.',
    zh: '很棒！现在所有新手都只能发送文本消息到这个群组。',
    no: 'Supert! Nå kan nykommere bare sende tekstmeldinger i chatten.',
    de: 'Great! Now all newcomers will only be able to send usual text messages to this chat.',
    id: 'Baiklah, sekarang semua anggota baru hanya bisa mengirim pesan teks biasa di grup ini.',
  },
  restrict_false: {
    ruen:
      'Great! Now all newcomers will be able to send any type of content to this chat. Отлично! Теперь все новички смогут отправлять любые сообщения в этот чат.',
    en: 'Great! Now all newcomers will be able to send any type of content to this chat.',
    ru: 'Отлично! Теперь все новички смогут отправлять любые сообщения в этот чат.',
    it: 'Great! Now all newcomers will be able to send any type of content to this chat.',
    et: 'Great! Now all newcomers will be able to send any type of content to this chat.',
    uk: 'Чудово! Тепер усі новачки зможуть надсилати будь-які повідомлення в чат.',
    br: 'Boa, Agora todos os novatos poderam mandar qualquer tipo de conteúdo para esse chat.',
    tr: 'Harika! Artık tüm yeni kullanıcılar, bu sohbete her türlü içeriği gönderebilecek.',
    es: '¡Genial! Ahora todos los recién llegados pueden enviar cualquier tipo de contenido a este chat.',
    zh: '很棒！现在所有新手都可以发送任何类型消息到这个群组。',
    no: 'Supert! Nå kan nykommere sende meldinger med all slags innhold i chatten',
    de: 'Great! Now all newcomers will be able to send any type of content to this chat.',
    id: 'Baiklah, sekarang semua anggota baru boleh mengirim pesan jenis apa pun di grup ini.',
  },
  deleteEntryMessages_true: {
    ruen:
      'Great! Now entry messages will be deleted. Отлично! Теперь сообщения о входе пользователей будут удаляться.',
    en: 'Great! Now entry messages will be deleted.',
    ru: 'Отлично! Теперь сообщения о входе пользователей будут удаляться.',
    it: 'Great! Now entry messages will be deleted.',
    et: 'Great! Now entry messages will be deleted.',
    uk: 'Чудово! Тепер повідомлення про вхід користувачів в чат будуть видалятися.',
    br: 'Boa, Agora a mensagem de entrada será apagada.',
    tr: 'Harika! Artık giriş mesajları silinecektir.',
    es: '¡Genial! Ahora los mensajes de entrada serán borrados.',
    zh: '很棒！现在，加入消息将被删除。',
    no: 'Supert! Meldinger sendt ved ankomst bli slettet.',
    de: 'Great! Now entry messages will be deleted.',
    id: 'Baiklah, sekarang pesan sambutan akan dihapus.',
  },
  deleteEntryMessages_false: {
    ruen:
      'Great! Now entry messages will not be deleted. Отлично! Теперь сообщения о входе пользователей не будут удаляться.',
    en: 'Great! Now entry messages will not be deleted.',
    ru: 'Отлично! Теперь сообщения о входе пользователей не будут удаляться.',
    it: 'Great! Now entry messages will not be deleted.',
    et: 'Great! Now entry messages will not be deleted.',
    uk: 'Чудово! Тепер повідомлення про вхід користувачів в чат не будуть видалятися.',
    br: 'Boa, Agora a mensagem de entrada não será apagada.',
    tr: 'Harika! Artık giriş mesajları silinmeyecek.',
    es: '¡Genial! Ahora los mensajes de entrada no serán borrados.',
    zh: '很棒！现在，加入消息将不被删除。',
    no: 'Supert! Meldinger sendt ved ankomst vil ikke bli slettet.',
    de: 'Great! Now entry messages will not be deleted.',
    id: 'Baiklah, sekarang pesan sambutan tidak akan dihapus.',
  },
  greetsUsers_true: {
    ruen:
      'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username). Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username).',
    en: 'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username).',
    ru: 'Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username).',
    it: 'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use.',
    et: 'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use.',
    uk: 'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use.',
    br: 'Boa! Agora os novatos que passarem no teste não serão congratulados. Por favor, responda essa mensagem com a o texto de congratulações que você gostaria de usar.',
    tr: 'Harika! Artık testi geçen yeni üyeler karşılanmayacak. Lütfen bu mesajı, kullanmak istediğiniz tebrik metni ile yanıtlayın ($title ve $username kullanabilirsiniz).',
    es: '¡Genial! Ahora los recién llegados que hayan pasado el test no serán saludados. Por favor, responde a este mensaje con el texto de saludo que quieres utilizar (puedes usar $title y $username).',
    zh: '很棒！现在通过测试的新人不会受到欢迎消息。 请回复此消息，并附上您要使用的问候语（您可以使用$title和$username）。',
    no: 'Supert! Nykommere som har bestått testen vil ikke få en velkomst. Vennligst svar på denne meldingen med teksten du vil bruke som velkomst (du kan bruke $title og $username).',
    de: 'Great! Now newcomers who passed the test will not be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username).',
    id: 'Baiklah, sekarang anggota baru yg lolos ujian tidak akan menerima pesan sambutan. Silakan balas pesan ini dengan pesan sambutan yg ingin anda gunakan (tersedia $title dan $username).',
  },
  greetsUsers_true_message: {
    ruen:
      'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username). The current greeting message follows. Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username). Текущее сообщение с приветствием ниже.',
    en: 'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username). The current greeting message follows.',
    ru: 'Отлично! Теперь пользователи, прошедшие проверку, будут получать сообщения с приветствиями. Пожалуйста, ответьте на это сообщение текстом, которым вы хотите встречать новых пользователей (можете использовать $title и $username). Текущее сообщение с приветствием ниже.',
    it: 'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use. The current greeting message follows.',
    et: 'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use. The current greeting message follows.',
    uk: 'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use. The current greeting message follows.',
    br: 'Boa! Agora os novatos que passarem no teste serão congratulados. Por favor, responda essa mensagem com o texto de congratulações que você gostaria de usar. O texto atual é:',
    tr: 'Harika! Artık testi geçen yeni üyeler karşılanacak. Lütfen bu mesajı, kullanmak istediğiniz tebrik metni ile yanıtlayın ($title ve $username kullanabilirsiniz). Geçerli tebrik mesajı aşağıdaki gibidir.',
    es: '¡Genial! Ahora los recién llegados que hayan pasado el test serán saludados. Por favor, responde a este mensaje con el texto de saludo que quieres utilizar (puedes usar $title y $username). El mensaje actual de saludo es:',
    zh: '很棒！现在通过测试的新人会受到欢迎消息。 请回复此消息，并附上您要使用的问候语（您可以使用$title和$username）。接下来是当前的问候消息。',
    no: 'Supert! Nykommere som har bestått testen vil få en velkomst. Vennligst svar på denne meldingen med teksten du vil bruke som velkomst (du kan bruke $title og $username).',
    de: 'Great! Now newcomers who passed the test will be greeted. Please, reply to this message with the greeting text you would like to use (you can use $title and $username). The current greeting message follows.',
    id: 'Baiklah, sekarang anggota baru yg lolos ujian akan menerima pesan sambutan. Silakan balas pesan ini dengan pesan sambutan yg ingin anda gunakan (tersedia $title dan $username). Pesan sambutan yg digunakan saat ini adalah...',
  },
  greetsUsers_false: {
    ruen:
      'Great! Now newcomers who passed the test will not be greeted. Отлично! Теперь пользователи, прошедшие проверку, не будут получать сообщения с приветствиями.',
    en: 'Great! Now newcomers who passed the test will not be greeted.',
    ru: 'Отлично! Теперь пользователи, прошедшие проверку, не будут получать сообщения с приветствиями.',
    it: 'Great! Now newcomers who passed the test will not be greeted.',
    et: 'Great! Now newcomers who passed the test will not be greeted.',
    uk: 'Great! Now newcomers who passed the test will not be greeted.',
    br: 'Boa! Agora os novatos que passarem no teste não serão congratulados',
    tr: 'Harika! Artık testi geçen yeni üyeler karşılanmayacak.',
    es: '¡Genial! Ahora los recién llegados que pasen el test no serán saludados.',
    zh: '很棒！现在通过测试的新人不会受到欢迎消息。',
    no: 'Supert! Nykommere som har bestått testen vil ikke få en velkomst.',
    de: 'Great! Now newcomers who passed the test will not be greeted.',
    id: 'Baiklah, sekarang anggota baru yg lolos ujian tidak menerima sambutan.',
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
    zh: '已接受！',
    no: 'Akseptert!',
    de: 'Akzeptiert!',
    id: 'Diterima!',
  },
  trust_success: {
    ruen: 'Accepted! Принято!',
    en: 'Accepted!',
    ru: 'Принято!',
    it: 'Accepted!',
    et: 'Accepted!',
    uk: 'Accepted!',
    br: 'Aceito!',
    tr: 'Kabul edildi!',
    es: '¡Aceptado!',
    zh: '已接受！',
    no: 'Akseptert!',
    de: 'Akzeptiert!',
    id: 'Diterima!',
  },
}
