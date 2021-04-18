importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);

var firebaseConfig = {
  apiKey: "AIzaSyCx3GZeCrXKB3E0vUaBwrgaW9os_28s9hE",
  authDomain: "gb-rea.firebaseapp.com",
  projectId: "gb-rea",
  storageBucket: "gb-rea.appspot.com",
  messagingSenderId: "18146765779",
  appId: "1:18146765779:web:198f15e30a20036f1b1d26"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// Add the public key generated from the console here.
// messaging.getToken({vapidKey: "BD6_Zv9VIvWTtPUppd076WvBF6yPj8mhwvtCdtWNaxvYV-uSnv9CiqCMzpsdunY-DluV0FeLkIRRGF13nztCPFk"});

function notifications(window) {
  'use strict';
 
 // Кнопка подписки/отписки для push-уведомлений
  var pushElement = document.querySelector('.push');
 
  // Проверяем, поддерживаются ли push-уведомления
  function isPushSupported() {
    // Если service-worker зарегистрирован,
    // проверяем, подписан ли пользователь на push-уведомления
    navigator.serviceWorker.ready
      .then(function (registration) {
        registration.pushManager.getSubscription()
        .then(function (subscription) {
          if (subscription) {
            changePushStatus(true);
          }
          else {
            changePushStatus(false);
          }
        })
        .catch(function (error) {
          console.error('Возникла ошибка', error);
        });
      });
  }
 
  // Предлагаем пользователю подписаться на push-уведомления
  function subscribePush() {
    navigator.serviceWorker.ready.then(function(registration) {
      // if (!registration.pushManager) {
      //   console.log("no push manager");
      //   return false;
      // }
 
      // // Подписываемся
      // registration.pushManager.subscribe({
      //   userVisibleOnly: true // Всегда показывать уведомления
      // })
      // .then(function (subscription) {
      //   alert('Успешно подписаны.');
      //   console.info('Подписаны на push-уведомления.');
      //   console.log(subscription);
      //   changePushStatus(true);
      // })
      // .catch(function (error) {
      //   changePushStatus(false);
      //   console.error('Ошибка подписки на push-уведомления: ', error);
      // });
      messaging
        .requestPermission()
        .then(function () {
          console.log("Notification permission granted.");
      })
    })
  }
 
  // Отписка от push-уведомлений
  function unsubscribePush() {
    navigator.serviceWorker.ready
    .then(function(registration) {
      registration.pushManager.getSubscription()
      .then(function (subscription) {
        // Если подписки нет, то выходим
        if(!subscription) {
          alert('Невозможно отписаться от push-уведомлений.');
          return;
        }
 
        // Непосредственно отписка
        subscription.unsubscribe()
          .then(function () {
            alert('Успешно отписаны.');
            console.info('push-уведомлений отменены.');
            console.log(subscription);
            changePushStatus(false);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error('Не получилось отписаться от push-уведомлений.');
      });
    })
  }
 
  // Изменение статуса (подписан/не подписан)
  function changePushStatus(status) {
    pushElement.dataset.checked = status;
    pushElement.checked = status;
    if (status) {
      pushElement.classList.add('active');
    }
    else {
     pushElement.classList.remove('active');
    }
  }
 
  // Обработка нажатия на кнопку подписки/отписки
  pushElement.addEventListener('click', function () {
    var isSubscribed = (pushElement.dataset.checked === 'true');
    if (isSubscribed) {
      unsubscribePush();
    }
    else {
      subscribePush();
    }
  });
 
  isPushSupported();
 };

setTimeout(function() {  notifications() }, 1000);