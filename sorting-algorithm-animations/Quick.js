class Quick extends Algorithm {

  constructor() {
    super();
    this.stack = [];
    this.stack.push({
      left: 0,
      right: count - 1
    });
    this.pending = false;
    this.partitionResult = 0;
  }

  partition(left, right) {
    if (!this.pending) {
      this.left = left;
      this.right = right;
    }
    this.pivot = values[Math.floor((this.left + this.right) / 2)];
    this.index = this.left;

    this.checks++;
    if (this.left <= this.right) {
      this.checks++;
      while (values[this.left] < this.pivot) {
        this.checks++;
        this.left++;
      }
      this.checks++;
      while (values[this.right] > this.pivot) {
        this.checks++;
        this.right--;
      }

      this.checks++;
      if (this.left <= this.right) {
        this.checks++;
        if (this.left < this.right) {
          this.swap(this.left, this.right);
        }
        this.left++;
        this.right--;
      }
      if (this.left <= this.right) { this.pending = true; }
      else { this.pending = false; }

    }
    this.partitionResult = this.left;
  }

  step() {
    if (this.pending) {
      this.partition();
      return;
    }
      this.checks++;
      if (this.stack.length > 0) {
        let { left, right } = this.stack[this.stack.length - 1];
        this.partition(left, right);
        if (this.pending) { return; } else { this.stack.pop(); }
        let index = this.partitionResult;

        this.checks++;
        if (left < index - 1) {
          this.stack.push({ left: left, right: index - 1 });
        }
        this.checks++;
        if (index < right) {
          this.stack.push({ left: index, right: right });
        }
      } else {
        this.complete();
      }

    
  }

}