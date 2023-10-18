{
  //整理检查property是否存在及各种方法问题说明，及检查值是否可用
  //检查是否存在property
  let obj = new Object() as any;
  console.log((obj.p || obj["p"]) == true); //false, 这种方法的问题是，如果p的值是null、undefined、false、“”、0值时，判断结果不对

  console.log(obj.hasOwnProperty("p")); //false;//这种方法不能检查由继承来的property，还有

  console.log(obj.p !== undefined); //false;//问题，如果有p这个property但是值为 undefined，这时检查不对

  console.log(typeof obj.p === "undefined"); //true; //问题，如果有p这个property但是类型为 undefined，这时检查不对

  //以上都有一个问题就是，如果obj为null，那么会是运行时异常, 这时可以改为使用 obj?.p来操作，如果增加？那么有可能是obj本身没有值
  console.log("p" in obj); //为false
  obj = Object.create(null); //ts在strict下，"obj = null"语法错误，但可以通过Object.create(null)来赋值。 注：通过Object.create(null)生成的对象没有 hasOwnProperty方法
  console.log("p" in obj); //为false
  obj = {};
  obj.p = undefined;
  console.log("p" in obj); //为true
  obj.p = null;
  console.log("p" in obj); //为true
  delete obj.p;
  console.log("p" in obj); //为false
  //从以上看 in 操作能很好的检测 property是否在在， 不过in 操作于 array时，是检查的下标
  obj = ["a", "b"];
  console.log(0 in obj); //为true
  console.log("a" in obj); //为false
  //终上，检查是否存在property的方法，每一个都有例外，没有完善的方法。
  //但是如果是检查值是否可用（不为null或undefinned为可用）那么可以使用如下方法
  obj?.p != null && obj?.p !== undefined;
}
{
  // null is type, null is a value, but typeof null === 'object'
  class Data {
    v: null = null;
  }

  let data1 = new Data();
  console.log(Object.keys(data1));

  if (data1["v"] == null) {
    console.log("data1[v] == null");
  }

  if (data1.v === undefined) {
    console.log("data1.v === undefined");
  }
  if (typeof data1.v === "undefined") {
    console.log("typeof data1.v === undefined");
  }

  console.log(typeof data1.v);
  console.log(typeof data1);
  let data2 = data1 as any;
  console.log("any:", Object.keys(data2));
  data2 = Object.create(null);
  console.log("Object.create(null): ", Object.keys(data2));
}

{
  // undefined is type and a value
  class Data {
    v: undefined = undefined;
  }

  let data2 = new Data();
  console.log(Object.keys(data2));

  if (data2.v === undefined) {
    console.log("data2.v === undefined");
  }
  if (typeof data2.v === "undefined") {
    console.log("typeof data2.v === undefined");
  }
}