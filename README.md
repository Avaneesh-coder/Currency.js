# Currency.js
 a module that creates a currency systemg
### setup
 install parse-ms and quick.db and slappey

## code
```
const eco = require('discord-currencyjs')
```

## command prompt
type `slappey` click "enter" type any name you want then click "enter" then click "down arrow" then click "enter" then go to [DEV PORTAL](https://discord.com/developers) and get your bot token and paste in your command prompt and then hit "enter" the put whavere prefix you like then hit "enter" then type `cd ./(givenname)`
now type slappey then click "down arrow" then "enter" then type (choose from #commands)

### #commands
balance
beg
daily
leaderboard
pay
work

### code for #commands
balance:
    return eco.balance(message, args[0] || null);
work:  
    return eco.work(message);
pay:  
    return eco.pay(message, args[1] || null);
daily: 
    return eco.daily(message);
beg:
    return eco.beg(message);
leaderboard:
    return eco.leaderboard(message);