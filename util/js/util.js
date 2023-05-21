//延迟执行一个函数
Function.prototype.delay = function (ms) {
    let f = this;
    return function (...args) {
        setTimeout((...args) => {
            f.apply(this, args)
        }, ms);
    }
}

/******************************   节流函数  ******************************/
//节流执行函数：返回一个函数，由于闭包，状态falg将一直在内存中
//throttle /ˈθrɒtl/

// 实现1：单位时间内执行第一次（立即执行），节流后面的
export function throttle(func, intervalTime = 100) {
    let lastTime = 0;
    return (...args) => {
        let now = Date.now();
        //首次调用会执行
        if (now - intervalTime > lastTime) {
            func.apply(this, args);
            lastTime = now;
        }
    }
}

// 实现2：单位时间内执行第一次（延迟执行），节流后面的
export const throttle1 = (func, intervalTime = 100) => {
    // 定义falg，初始为true
    let flag = true;
    // 返回的函数是每次用户实际调用的节流函数
    return (...args) => {
        const ctx = this;
        // 如果flag为true，则执行定时器
        if (flag) {
            setTimeout(() => {
                func.apply(ctx, args);
                // 函数执行完毕后=true；
                flag = true;
            }, intervalTime);
        }
        //没执行完成前都为false
        flag = false;
    };
}


// 实现3：执行首次+最后一次，节流中间的，比较综合的节流方式！
function throttleMiddle(func, intervalTime = 100) {
    let timer = null;
    let startTime = 0;
    return (...args) => {
        const ctx = this;
        const now = Date.now();
        if (startTime && now < startTime + intervalTime) {
            //替换前面的
            clearTimeout(timer);
            timer = setTimeout(() => {
                startTime = now;
                func.apply(ctx, args);
            }, Math.max(intervalTime - (Date.now() - startTime), 0)); //剩余等候时间
        } else { //每轮首次会执行，立即执行
            startTime = now;
            func.apply(ctx, args);
        }
    }
}

// 节流-函数扩展，使用的throttleMiddle版本
Function.prototype.throttle = function (intervalTime = 100) {
    let func = this;
    let startTime, timer = null;
    //这里不能用箭头函数，会导致this污染
    return function (...args) {
        const ctx = this;
        let now = Date.now();
        if (startTime && now < startTime + intervalTime) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
                startTime = now;
            }, Math.max(intervalTime - (now - startTime), 0));
        }
        else {
            startTime = now;
            func.apply(ctx, args);
        }
    }
}

/******************************   防抖函数  ******************************/
//只执行最后一次，连续（间隔时间小于延迟时间）调用的最后一次才会执行，前面的都会被代替掉
//bounce /baʊns/  晃动，弹跳
function debounce(func, delayTime) {
    let timer;
    return function (...args) {
        //清除-替换，把前浪拍死在沙滩上
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delayTime);
    }
}

// vuex的持久化
export let mixin_store_persistent = {
    created: function () {
        //持久化store，避免刷新后的状态丢失
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem('vstore', JSON.stringify(this.$store.state));
        });
        try {
            const vstore = sessionStorage.getItem('vstore');
            if (vstore)
                this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(vstore)));
        }
        catch (ex) {
            console.log(ex)
        }
    }
}

/******************************   deepClone深拷贝对象  ******************************/

///深拷贝一个对象，target为待拷贝的对象，hash用于内部缓存对象，不用传
function deepClone(target, hash = new WeakMap()) {
    //值类型直接返回
    if (target === null || typeof target !== 'object')
        return target;
    //对象属性值都放入map中,避免循环引用
    if (hash.get(target))
        return hash.get(target);
    // 兼容数组
    let newObj = Array.isArray(target) ? [] : {};
    //缓存到map中
    hash.set(target, newObj);
    for (let key in target) {
        //只处理自己的一级属性，过滤原型继承的
        if (!target.hasOwnProperty(key)) continue;
        // 值类型直接赋值，引用类型递归
        if (target[key] === null || typeof target[key] !== 'object')
            newObj[key] = target[key];
        else
            newObj[key] = deepClone(target[key], hash);
    }
    return newObj;
}

/******************************   Array 扩展  ******************************/

//删除集合中指定条件的数据
Array.prototype.remove = function (filter) {
    const arr = this;
    const items = arr.filter(filter);
    for (let item of items) {
        const index = arr.indexOf(item);
        if (index >= 0)
            arr.splice(index, 1);
    }
}

//返回集合的最后一个元素
Array.prototype.last = function () {
    return this[this.length - 1];
}