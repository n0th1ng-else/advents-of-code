pub struct ParsedRow {
    pub dir: String,
    pub val: i32,
}

pub fn parse_rows(rows: &Vec<String>) -> Vec<ParsedRow> {
    let parsed: Vec<ParsedRow> = rows
        .iter()
        .map(|row| {
            let dir: String = row.chars().next().unwrap().to_string();
            let val: i32 = row[1..].parse().unwrap();

            ParsedRow { dir, val }
        })
        .collect();

    parsed
}
