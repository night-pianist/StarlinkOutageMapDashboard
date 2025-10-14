import pandas as pd
from datetime import date

# load and filter data by date
# extract fields: dst, start_time, country
def load_and_filter_by_day(csv_path: str, start_year: int, start_month: int, start_day: int,
                             end_year: int, end_month: int, end_day: int) -> pd.DataFrame:
    df = pd.read_csv(csv_path)

    # convert timestamp column to datetime
    df["start_time"] = pd.to_datetime(df["start_time"], errors="coerce")

    # set start and end dates
    start_date = date(start_year, start_month, start_day)
    end_date = date(end_year, end_month, end_day)

    # filter rows within range (inclusive)
    mask = (df["start_time"].dt.date >= start_date) & (df["start_time"].dt.date <= end_date)
    filtered = df.loc[mask]

    # extract desired fields
    filtered = filtered[["dst", "start_time", "country"]]

    return filtered 

# # load and filter data on a given day by time
# def load_and_filter(csv_path: str, target_date: str) -> pd.DataFrame:
#     df = pd.read_csv(csv_path)
#     filtered = df[df["date"] == target_date]
#     return filtered

# compute outage ratio per country
def compute_outage_ratios(df: pd.DataFrame) -> pd.DataFrame:
    total_outages = len(df)
    country_counts = df.groupby("country").size().reset_index(name="count")
    country_counts["ratio"] = country_counts["count"] / total_outages
    return country_counts[["country", "ratio"]]

# convert df to json for frontend
def format_for_frontend(df: pd.DataFrame) -> list[dict]:
    return df.to_dict(orient="records")

# run it together

# run it together
def get_ratios(csv_path: str, start_year: int, start_month: int, start_day: int,
                end_year: int, end_month: int, end_day: int):
    filtered_df = load_and_filter_by_day(csv_path, start_year, start_month, start_day, end_year, end_month, end_day)
    # filtered_df.to_csv("filtered_outages.csv", index=False) 
    # print(filtered_df.head(5)) # works

    country_ratios_df = compute_outage_ratios(filtered_df)
    # country_ratios_df.to_csv("country_ratios.csv", index=False)
    # print(country_ratios_df.head(5)) # works

    # Save JSON to frontend folder
    output_path = "../../frontend/src/assets/ratio_outages.json" 
    country_ratios_df.to_json(output_path, orient="records", date_format="iso", indent=2)
    
if __name__ == "__main__":
    get_ratios("../outage_data/outages.csv", 2025, 5, 27, 2025, 5, 27)
    