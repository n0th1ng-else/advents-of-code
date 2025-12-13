mod parser;

use crate::parser::{ParsedRow, parse_rows};
use std::fs;

fn main() {
    let input = fs::read_to_string("./part1.txt").unwrap();
    let lines: Vec<String> = input.lines().map(|line| line.to_string()).collect();
    let res: i32 = task(&lines);
    println!("{} Sample={} Part1={}", res, res == 3, res == 1139);
}

struct TaskResult {
    result: i32,
    sample: i32,
    task: i32,
}

fn task(rows: &Vec<String>) -> i32 {
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

    cnt
}
