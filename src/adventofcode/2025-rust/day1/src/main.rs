mod parser;

use crate::parser::{ParsedRow, parse_rows};
use std::fs;

fn main() {
    let is_sample = false;
    let is_task2 = false;

    let task_path = if is_sample == true {
        "./sample.txt"
    } else {
        "./task.txt"
    };
    let input = fs::read_to_string(task_path).unwrap();
    let lines: Vec<String> = input.lines().map(|line| line.to_string()).collect();
    let res = if is_task2 == true {
        task2(&lines)
    } else {
        task1(&lines)
    };
    println!(
        "Calculated={} Sample={} Correct={}",
        res.result, res.sample, res.task
    );
}

struct TaskResult {
    result: i32,
    sample: i32,
    task: i32,
}

fn task1(rows: &Vec<String>) -> TaskResult {
    let parsed: Vec<ParsedRow> = parse_rows(rows);

    let (cnt, _) = parsed
        .iter()
        .fold((0, 50), |(count, sum), ParsedRow { dir, val }| {
            let next_pos = if dir == "L" { sum - val } else { sum + val };

            let act = if next_pos < 0 {
                let last_digits: i32 = (-next_pos).to_string()[..].parse::<i32>().unwrap() % 100;
                let actual: i32 = 100 - last_digits;
                actual
            } else {
                next_pos
            };
            let counted: i32 = if act % 100 == 0 { 1 } else { 0 };
            let item = (count + counted, act % 100);
            item
        });

    TaskResult {
        result: cnt,
        sample: 3,
        task: 1139,
    }
}

fn task2(rows: &Vec<String>) -> TaskResult {
    let parsed: Vec<ParsedRow> = parse_rows(rows);

    let (cnt, _) = parsed
        .iter()
        .fold((0, 50), |(count, sum), ParsedRow { dir, val }| {
            // println!("{:?} {} {}", (count, sum), dir, val);

            let round_circles: i32 = val / 100;
            let round_mod = val % 100;
            let round_val: i32 = val - round_circles * 100;

            if round_mod == 0 {
                return (count + round_circles, sum);
            }

            if dir == "L" {
                let curr = sum - round_val;
                let curr_modifier: i32 = if sum == 0 { 0 } else { 1 };

                if curr == 0 {
                    return (count + round_circles + 1, curr);
                }

                if curr < 0 {
                    (count + round_circles + curr_modifier, 100 + curr)
                } else {
                    (count + round_circles, curr)
                }
            } else {
                let curr = sum + round_val;
                let curr_circles = curr / 100;
                let curr_val = curr % 100;
                (count + round_circles + curr_circles, curr_val)
            }
        });

    TaskResult {
        result: cnt,
        sample: 6,
        task: 6684,
    }
}
