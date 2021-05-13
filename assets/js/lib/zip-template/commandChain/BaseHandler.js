export class BaseHandler {
  constructor(next){
    this.next = next;
  }

  execute(request){
    const result = this.handle(request);
    if(result != null && this.next != null){
      return this.next.execute(result);
    }
    return request;
  }

  handle(request){
    return request;
  }

  setNext(handler){
    this.next = handler;
  }

}