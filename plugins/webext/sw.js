// Keeps the countdown honest while the popup is closed:
// badge shows minutes left, a notification fires when time is up.
const ext = globalThis.chrome ?? globalThis.browser;

async function updateBadge() {
  const s = await ext.storage.local.get(['running', 'endAt']);
  if (s.running && s.endAt > Date.now()) {
    const min = Math.ceil((s.endAt - Date.now()) / 60000);
    await ext.action.setBadgeText({ text: min + 'm' });
    await ext.action.setBadgeBackgroundColor({ color: '#e05555' });
  } else {
    await ext.action.setBadgeText({ text: '' });
  }
}

ext.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'schedule') {
    ext.alarms.create('pt-finish', { when: msg.endAt });
    ext.alarms.create('pt-badge', { periodInMinutes: 1 });
    updateBadge();
  } else if (msg.type === 'clear') {
    ext.alarms.clear('pt-finish');
    ext.alarms.clear('pt-badge');
    updateBadge();
  }
});

ext.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'pt-badge') return updateBadge();
  if (alarm.name === 'pt-finish') {
    await ext.storage.local.set({ running: false, remaining: 0 });
    await ext.alarms.clear('pt-badge');
    await ext.action.setBadgeText({ text: '' });
    ext.notifications.create('pt-done', {
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: '🍅 Time is up!',
      message: 'Pomodoro finished',
      priority: 2,
    });
  }
});
