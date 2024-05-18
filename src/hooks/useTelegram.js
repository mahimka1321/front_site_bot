
const tg = window.Telegram.WebApp;

export function useTelegram() {
    
    const onClose = () => {
      tg.close();
    }

    const onToggelButton = () => {
       
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggelButton,
        tg,
        user : tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,

    }
}