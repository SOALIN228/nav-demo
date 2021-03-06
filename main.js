// 初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

// 生成键盘
generateKeyboard(keys, hash)

// 监听用户动作
listenToUser(hash)

// 工具函数
function getFromLocalStorage (name) {
  return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag (tagName, attributes) {
  var element = document.createElement(tagName)
  for (var key in attributes) {
    element[key] = attributes[key]
  }

  return element
}

function createButton (id) {
  var button = tag('button', { textContent: 'E', id: id })
  button.onclick = function (ex) {
    var button2 = ex['target']
    var img2 = button2.previousSibling
    var key = ex['target']['id']
    var x = prompt('换成你想去的网址')
    console.log(x)
    if (x !== null && x !== '') {
      hash[key] = x
      img2.src = 'http://' + x + '/favicon.ico'
      img2.onerror = function (xxx) {
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
      }
      localStorage.setItem('zzz', JSON.stringify(hash))
    }
  }

  return button
}

function createImg (domain) {
  var img = tag('img')
  if (domain) {
    img.src = 'https://' + domain + '/favicon.ico'
  } else {
    img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  img.onerror = function (ex) {
    ex.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }

  return img
}

function init () {
  var keys = {
    0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    length: 3
  }

  var hash = {
    q: 'www.qq.com',
    w: 'weibo.com',
    e: 'h5.ele.me',
    t: 'www.taobao.com',
    i: 'www.iqiyi.com/',
    a: 'www.amazon.cn',
    d: 'www.douban.com',
    f: 'www.ifeng.com/',
    g: 'ganji.com/',
    j: 'www.jd.com',
    k: 'www.kaixin001.com/',
    z: 'www.zhihu.com',
    x: 'www.xunlei.com',
    c: 'www.csdn.net',
    b: 'www.bilibili.com',
    m: 'www.meituan.com'
  }

  // 取出localStorage中 zzz 对于的hash
  var hashInLocalStorage = getFromLocalStorage('zzz')

  if (hashInLocalStorage) {
    hash = hashInLocalStorage
  }

  return {
    'keys': keys,
    'hash': hash
  }
}

function generateKeyboard (keys, hash) {
  for (var index = 0; index < keys['length']; index++) {
    var div = tag('div', { className: 'row' })
    main.appendChild(div)

    var row = keys[index]
    for (var index2 = 0; index2 < row.length; index2++) {
      var span = tag('span', { textContent: row[index2], className: 'text' })

      var button = createButton(row[index2])

      var img = createImg(hash[row[index2]])

      var kbd = tag('kbd', { className: 'key' })

      kbd.appendChild(span)
      kbd.appendChild(img)
      kbd.appendChild(button)

      div.appendChild(kbd)
    }
  }
}

function listenToUser (hash) {
  document.onkeypress = function (va) {
    var key = va['key']
    console.log(key)
    var website = hash[key]
    window.open('https://' + website, '_blank')
  }
}
