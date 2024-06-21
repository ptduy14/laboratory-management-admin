import React, { useEffect, useState } from "react";
import Chart, { Props } from "react-apexcharts";
import { RoomService } from "@/services/roomService";
import useSWR from "swr";
import { Room } from "../rooms/room-table/data";
import { ResourcesTransfered } from "../room-resources/room-resources-table/data";
import { roomsFetcher } from "@/utils/fetchers/room-fetchers.ts/rooms-fetcher";
import { roomResourcesFetcher } from "@/utils/fetchers/room-resource-fetchers/room-resources-fetcher";

interface ResourcesFormRooms {
  roomId: number;
  roomName: string;
  resources: Object[];
  totalQuantityBorrowed: number;
  totalQuantityReturned: number;
}

export const Steam = () => {
  const [resourcesFormRooms, setResourcesForms] = useState<ResourcesFormRooms[]>([]);

  const { data: rooms, isLoading: isFetchingRooms } = useSWR(["/rooms", {take: 50}], ([url, queryParams]) => roomsFetcher(url, queryParams));

  const calculateTotalQuantityBorrowed = (data: any) => {
    return data.reduce((total: string, current: ResourcesTransfered) => {
      return total + current.itemQuantityBorrowed;
    }, 0);
  };

  const calculateTotalQuantityReturned = (data: any) => {
    return data.reduce((total: string, current: ResourcesTransfered) => {
      return total + current.itemQuantityReturned;
    }, 0);
  };

  useEffect(() => {
    if (rooms?.data) {
      const fetchResources = async () => {
        const resources = await Promise.all(
          rooms.data.map(async (room: Room) => {
            const response = await roomResourcesFetcher(`/room-items/room/${room.id}`)
            const totalQuantityBorrowed = calculateTotalQuantityBorrowed(response.data);
            const totalQuantityReturned = calculateTotalQuantityReturned(response.data);
            return {
              roomId: room.id,
              roomName: room.name,
              resources: response.data,
              totalQuantityBorrowed,
              totalQuantityReturned,
            };
          })
        );
        setResourcesForms(resources);
      };

      fetchResources();
    }
  }, [rooms, isFetchingRooms]);

  const state: Props["series"] = [
    {
      name: "Đã trả",
      data: [...resourcesFormRooms].reverse().map((roomResources) => roomResources.totalQuantityReturned),
    },
    {
      name: "Đã mượn",
      data: [...resourcesFormRooms].reverse().map((roomResources) => roomResources.totalQuantityBorrowed),
    },
  ];

  const options: Props["options"] = {
    chart: {
      type: "area",
      animations: {
        easing: "linear",
        speed: 300,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: "basic-bar",
      foreColor: "hsl(var(--nextui-default-800))",
      stacked: true,
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: [...resourcesFormRooms].reverse().map((roomResources) => roomResources.roomName),
      labels: {
        // show: false,
        style: {
          colors: "hsl(var(--nextui-default-800))",
        },
      },
      axisBorder: {
        color: "hsl(var(--nextui-nextui-default-200))",
      },
      axisTicks: {
        color: "hsl(var(--nextui-nextui-default-200))",
      },
    },
    yaxis: {
      labels: {
        style: {
          // hsl(var(--nextui-content1-foreground))
          colors: "hsl(var(--nextui-default-800))",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "hsl(var(--nextui-default-200))",
      strokeDashArray: 0,
      position: "back",
    },
    stroke: {
      curve: "smooth",
      fill: {
        colors: ["red"],
      },
    },
    // @ts-ignore
    markers: false,
  };

  return (
    <>
      <div className="w-full z-20">
        <div id="chart">
          <Chart options={options} series={state} type="area" height={425} />
        </div>
      </div>
    </>
  );
};
