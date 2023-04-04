<?php
interface JSArray
{
    public function push($value);
    public function pop();
    public function shift();
    public function unshift($value);
    public function splice($start, $deleteCount, ...$items);
    public function slice($start, $end = null);
    public function forEach($callback);
    public function map($callback);
    public function filter($callback);
    public function reduce($callback, $initialValue);
    public function every($callback);
    public function some($callback);
    public function indexOf($searchElement, $fromIndex = null);
    public function join($separator = ",");
    public function reverse();
    public function sort($callback = null);
}
class PHPArray implements JSArray
{
    private $array = [];

    public function push($value)
    {
        return array_push($this->array, $value);
    }

    public function pop()
    {
        return array_pop($this->array);
    }

    public function shift()
    {
        return array_shift($this->array);
    }

    public function unshift($value)
    {
        return array_unshift($this->array, $value);
    }

    public function splice($start, $deleteCount, ...$items)
    {
        array_splice($this->array, $start, $deleteCount, $items);
    }

    public function slice($start, $end = null)
    {
        return array_slice($this->array, $start, $end);
    }

    public function forEach($callback)
    {
        array_walk($this->array, $callback);
    }

    public function map($callback)
    {
        return array_map($callback, $this->array);
    }

    public function filter($callback)
    {
        return array_filter($this->array, $callback);
    }

    public function reduce($callback, $initialValue)
    {
        return array_reduce($this->array, $callback, $initialValue);
    }

    public function every($callback)
    {
        foreach ($this->array as $element) {
            if (!$callback($element)) {
                return false;
            }
        }
        return true;
    }

    public function some($callback)
    {
        foreach ($this->array as $element) {
            if ($callback($element)) {
                return true;
            }
        }
        return false;
    }

    public function indexOf($searchElement, $fromIndex = null)
    {
        return array_search($searchElement, $this->array, true);
    }

    public function join($separator = ",")
    {
        return implode($separator, $this->array);
    }

    public function reverse()
    {
        return array_reverse($this->array);
    }

    public function sort($callback = null)
    {
        if ($callback == null) {
            sort($this->array);
        } else {
            usort($this->array, $callback);
        }
        return $this->array;
    }
}

// use PHPUnit\Framework\TestCase;

// class test extends TestCase
// {
//     private $testArray;
//     protected function setUp(): void
//     {
//         $this->testArray = new PHPArray();
//     }

//     public function testPush()
//     {
//         $this->testArray->push(1);
//         $this->testArray->push(2);
//         $this->testArray->push(3);
//         $this->assertEquals([1, 2, 3], $this->testArray);
//     }

//     public function testPop()
//     {
//         $this->testArray->push(1);
//         $this->testArray->push(2);
//         $this->testArray->push(3);
//         $this->assertEquals(3, $this->testArray->pop());
//         $this->assertEquals([1, 2], $this->testArray);
//     }
// }

$test = new PHPArray;
$test->push(1);
print_r($test->);
