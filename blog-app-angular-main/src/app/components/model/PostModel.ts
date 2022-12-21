export class PostModel {
  public post_id:Number;
  public post_title:String;
  public post_description:String;
  public post_image:String
  constructor(post_id:Number| -1 ,post_title:String,post_description:String,post_image:String) {
    if(post_id!==-1){
      this.post_id=post_id;
      this.post_title=post_title;
      this.post_description=post_description;
      this.post_image=post_image;
    }else{
      this.post_title=post_title;
      this.post_description=post_description;
      this.post_image=post_image;
    }
  }


}
